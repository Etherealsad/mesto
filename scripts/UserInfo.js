export default class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._userName = document.querySelector(nameSelector)
        this._userJob = document.querySelector(jobSelector)
    }
    
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent
        }
    }
    
    setUserInfo(data) {
        this._userName.textContent = data["profile-title"]
        this._userJob.textContent = data["profile-subtitle"]
    }
}