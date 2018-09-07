let apiKey=process.env.npm_config_api_key;
if (typeof apiKey==="undefined"){
	console.log("Missing api_key argument. Run test with npm \"npm test --api_key=<API_KEY>\"");
	process.exit();
}
let totalTests=0,
	runnedTests=0,
	successedTests=0;
function printTestResult(testName, success){
	runnedTests++;
	successedTests+=success?1:0;
	let color=success?"\x1b[32m":"\x1b[31m";
	console.log("%s%s ["+(success?"✓":"✗")+"]\x1b[0m", color, testName);
}
function finishTest(resolve){
	if (runnedTests===totalTests){
		resolve({
			successed:successedTests,
			total:totalTests
		});
	}
}
let YouTubeDataAPI=require('./index.js');
new Promise((resolve, reject)=>{
	/* ---------- TEST START ---------- */
	totalTests++;
	let api=new YouTubeDataAPI();
	api.setKey(apiKey);
	printTestResult("API key setted after instantiation.", api.key===apiKey);
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	api=new YouTubeDataAPI(apiKey);
	printTestResult("API key setted through constructor.", api.key===apiKey);
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	new Promise((resolve, reject)=>{
		let testName="getChannels";
		api.getChannels().then((result)=>{
			resolve({
				testName:testName,
				result:true
			});
		}).catch((error)=>{
			resolve({
				testName:testName,
				result:false
			});
		});
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	new Promise((resolve, reject)=>{
		let testName="getChannelDetails";
		try{
			api.getChannelDetails({
				id:"UCsLiV4WJfkTEHH0b9PmRklw"
			}).then((result)=>{
				resolve({
					testName:testName,
					result:true
				});
			}).catch((error)=>{
				resolve({
					testName:testName,
					result:false
				});
			});
		}
		catch (e){
			resolve({
				testName:testName,
				result:false
			});
		}
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	new Promise((resolve, reject)=>{
		totalTests++;
		let testName="getChannelStatistics";
		api.getChannelStatistics().then((result)=>{
			resolve({
				testName:testName,
				result:true
			});
		}).catch((error)=>{
			resolve({
				testName:testName,
				result:false
			});
		});
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	new Promise((resolve, reject)=>{
		let testName="getVideos";
		api.getVideos().then((result)=>{
			resolve({
				testName:testName,
				result:true
			});
		}).catch((error)=>{
			resolve({
				testName:testName,
				result:false
			});
		});
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	new Promise((resolve, reject)=>{
		let testName="getVideosFromChannel";
		try{
			api.getVideosFromChannel({
				channelID:"UCsLiV4WJfkTEHH0b9PmRklw"
			}).then((result)=>{
				resolve({
					testName:testName,
					result:true
				});
			}).catch((error)=>{
				resolve({
					testName:testName,
					result:false
				});
			});
		}
		catch (e){
			resolve({
				testName:testName,
				result:false
			});
		}
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */

	/* ---------- TEST START ---------- */
	totalTests++;
	new Promise((resolve, reject)=>{
		let testName="getVideoDetails";
		try{
			api.getVideoDetails({
				videoIDs:"O0QDEXZhow4"
			}).then((result)=>{
				resolve({
					testName:testName,
					result:true
				});
			}).catch((error)=>{
				resolve({
					testName:testName,
					result:false
				});
			});
		}
		catch (e){
			resolve({
				testName:testName,
				result:false
			});
		}
	}).then((result)=>{
		printTestResult(result.testName, result.result);
		finishTest(resolve);
	});
	/* ---------- TEST FINISH ---------- */
	finishTest(resolve);
}).then((result)=>{
	let finalColor=result.successed===result.total?"\x1b[32m":(result.successed>0?"\x1b[33m":"\x1b[31m");
	console.log("%sTotal test results: %s / %s\x1b[0m", finalColor, result.successed, result.total);
});