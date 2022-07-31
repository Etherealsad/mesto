export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._userName = document.querySelector(nameSelector)
        this._userJob = document.querySelector(jobSelector)
        this._userAvatar = document.querySelector(avatarSelector)
    }
    
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent
        }
    }
    
    setUserInfo(userName, userJob) {
        this._userName.textContent = userName
        this._userJob.textContent = userJob
    }

    setUserAvatar(avatarUrl) {
        this._userAvatar.style.backgroundImage = `url(${avatarUrl})`;
    }

    setUserId(userID) {
        this._userID = userID;
    }

    getUserId(){
        return this._userID;
    }
}