const request=require('request');

class YouTubeDataAPI {
	constructor(key=""){
		this.baseURL="https://www.googleapis.com/youtube/v3/";
		this.key=key;
		this.apiOptions={
			maxResults:50
		};
	}
	getChannels(filter){
		return this.request("search?part=snippet&type=channel", filter);
	}
	getChannelDetails(filter){
		return new Promise((resolve, reject)=>{
			this.request("channels?part=snippet,statistics", filter).then((response)=>{
				resolve({
					filter:filter,
					result:response
				});
			}).catch((error)=>{
				reject(error);
			});
		});
	}
	getChannelStatistics(id){
		return new Promise((resolve, reject)=>{
			this.request("channels?part=statistics", {
				id:id
			}).then((response)=>{
				resolve({
					id:id,
					result:response
				});
			});
		});
	}
	getVideos(filter){
		return this.request("search?part=snippet&type=video", filter);
	}
	getVideosFromChannel(filter){
		return this.request("search?part=snippet&channelId="+filter.channelID+"&order=date&type=video", {
			maxResults:this.apiOptions.maxResults,
			pageToken:typeof filter.pageToken==="string"?filter.pageToken:""
		});
	}
	getVideoDetails(filter){
		return this.request("videos?part=snippet,statistics&id="+filter.videoIDs+"&order=date&type=video", {
			maxResults:this.apiOptions.maxResults
		});
	}
	request(url, filter){
		if (this.key.length>0){
			if (typeof filter!=="undefined"){
				for (let key in filter){
					url+="&"+key+"="+filter[key];
				}
			}
			return new Promise((resolve, reject)=>{
				request(this.baseURL+url+"&key="+this.key, {
					json:true
				}, (error, res, response)=>{
					if (error!==null){
						reject(error);
					}
					if (typeof response.error!=="undefined"){
						reject(response.error);
					}
					resolve(response);
				});
			});
		}
	}
	setKey(key){
		this.key=key;
	}
}

module.exports=YouTubeDataAPI;