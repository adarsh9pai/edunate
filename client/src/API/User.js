import API from './index';


export class User {
    constructor({ displayName, bitmoji, fullName, age, university, major, classification, city }) {
        this.displayName = displayName;
        this.bitmoji = bitmoji;
        this.fullName = fullName;
        this.age =age;
        this.university = university;
        this.major = major;
        this.classification = classification;
        this.city = city;
    }
}

export const getUser = async userID => {
    try {
        const res = await API.get(`/users/get?displayName=${userID}`);
        return new User(res.data);
    } catch (error) {
        console.log(error);
    }
}