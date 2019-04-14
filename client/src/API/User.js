import API from './index';


export class User {
    constructor({ displayName, bitmoji, fullName, age, university, major, classification, location }) {
        this.displayName = displayName;
        this.bitmoji = bitmoji;
        this.fullName = fullName;
        this.age =age;
        this.university = university;
        this.major = major;
        this.classification = classification;
        this.location = location;
    }

    add = () => ({
        displayName: this.displayName,
        bitmoji: this.bitmoji,
        fullName: this.fullName,
        age: this.age,
        university: this.university,
        major: this.major,
        classification: this.classification,
        location: this.location,
    })
}

export const getUser = async userID => {
    try {
        const res = await API.get(`/users/get?displayName=${userID}`);
        return new User(res.data.user);
    } catch (error) {
        console.log(error);
    }
}

export const addUser = user => {
    return new Promise((resolve, reject) => {
        API.post('/users/add',
        JSON.stringify(user.add()), 
        {})
        .then(() => resolve('User added!'))
        .catch (err => reject(err));
    })
}