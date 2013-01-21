var model = require('./tweetsModel.js')
, cronJob = require('cron').CronJob;


var DbCleaner = function(model, opts){

	var self = this;

	//set up the database connection
	this.database = model;

	//set frequency to be some default value
	this.frequencyInMinutes = opts.frequency || 10;	

	//set the how far back tweets can go before they're removed, this is in minutes
	this.thresholdForRemoval = opts.threshold || 120;

	if(this.thresholdForRemoval <= 0){
		throw new Error('Error, invalid threshold');
	}	

	this.cronExpression = createCronExpression(this.frequencyInMinutes);

	if(!this.cronExpression){
		throw new Error('Error, invalid frequency');
	}

	var options = {
		cronTime: this.cronExpression 
		,onTick: function(){
				self.cleanDb();
			}
		,start: true 
	};

	this.cleanJob = new cronJob(options);
};

DbCleaner.prototype.cleanDb = function(cb){

	console.log('Running a the cleaning job');

	var callback = cb || function() { };

	var currentTime = new Date();

	//compute the time which we will delete everything before	
	var dateToDeletePrior = new Date(currentTime.valueOf() - this.thresholdForRemoval * 60 * 1000);
	
	//delete all the prior tweets to that date	
	this.database.deletePriorTweets(dateToDeletePrior, function(error, results){
		
		if(error){
			console.log('Error removing tweets from the db cleaner ' + error);
			return callback(error);
		}
		else{
			console.log('Successfully removed ' + results.affectedRows + ' tweets from the db ');
			return callback(null, results);
		}
	});
}


DbCleaner.prototype.changeCleaningData = function(options){

	if(options.threshold > 0){
		this.thresholdForRemoval = options.threshold * 60;
	}

	//if the user input a new frequency
	if(options.frequency){

		//see if we can create a new cron expression from it
		var cronExpression = createCronExpression(options.frequency);

		//if we can't create a new cron expression, just error out	
		if(!cronExpression){
			return new Error('Error, couldn\'t create a cron expression with your input frequency');
		}	
	
		this.cronExpression = cronExpression;
		this.cleanJob.stop();

		var self = this;
		
		//restart the new one with the different options	
		var options = {
			cronTime: this.cronExpression 
			,onTick: function(){
				self.cleanDb();
				}
			,start: true
		}

		//restart the cron job
		this.cleanJob = new cronJob(options);
	}
}

DbCleaner.prototype.stopCleaning = function(){
	this.cleanJob.stop();
}

DbCleaner.prototype.startCleaning = function(){
	this.cleanJob.start();
}

DbCleaner.prototype.getCronExpression = function(){
	return this.cronExpression;
}

function createCronExpression(frequencyInMinutes){

	//if it is negative frequency, we can't create a cron expression
	if(frequencyInMinutes < 0 || frequencyInMinutes > 60){
		return null;
	}
	
	return '0 */' + frequencyInMinutes + ' * * * *';	

}

exports.DbCleaner = DbCleaner;
