import API from './index';
import { User } from './User';
import { Received } from './Received';
import { Request } from './Request';

export class Barter {
    constructor({id, user, received = [], datePosted, promise, hashtags, request, dateEnd = new Date(), isFulfilled}) {
        console.log('in user', user);
        this.user = new User(user);
        this.received = received;
        this.datePosted = datePosted;
        this.id = id;
        this.promise = promise;
        this.hashtags = hashtags;
        this.request = new Request(request);
        this.dateEnd = dateEnd;
        this.isFulfilled = isFulfilled;
    }

    add = () => ({
        user: this.user,
        request: this.request,
        promise: this.promise,
        hashtags: this.hashtags,
        dateEnd: (new Date().toJSON().slice(0,10)).split('-').join('/'),
    })

    update = () => ({
        user: this.user,
        received: this.received,
        datePosted: this.datePosted,
        id: this.id,
        promise: this.promise,
        hashtags: this.hashtags,
        request: this.request,
        dateEnd: (new Date().toJSON().slice(0,10)).split('-').join('/'),
        isFulfilled: false,
    })
}

export const getAllBarters = () => {
    return new Promise((resolve, reject) => {
        API.get(`/barter/getall`)
            .then(res => res.data.result)
            .then(barters => resolve(barters.map(barter => new Barter(barter))))
            .catch(err => reject(err));
    })
}

export const getBatersByUser = (displayName) => {
    return new Promise((resolve, reject) => {
        API.get(`/barter/getall?displayName=${displayName}`)
            .then(res => res.data)
            .then(barters => resolve(barters.map(barter => new Barter(barter))))
            .catch(err => reject(err));
    })
}

export const getTrendingHashtags = () => {
    return new Promise((resolve, reject) => {
        API.get('/barter/trending')
            .then(res => res.data.hashtags)
            .then(hashtags => resolve(hashtags))
            .catch(err => reject(err));
    })
}

export const addBarter = barter => {
    return new Promise((resolve, reject) => {
        API.post('/barter/add',
        JSON.stringify(barter.add()), 
        {})
        .then(() => resolve('Barter added!'))
        .catch (err => reject(err));
    })
}

export const updateBarter = barter => {
    console.log('in updating barter', barter.update());
    return new Promise((resolve, reject) => {
        API.post('/barter/update', 
        JSON.stringify(barter.update()),
        {})
            .then(() => resolve('Barter updated!'))
            .catch(err => reject(err));
    })
}