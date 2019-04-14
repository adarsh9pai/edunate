import API from './index';
import { User } from './User';
import { Received } from './Received';

export class Barter {
    constructor({user, received, datePosted, id, promise, hashtags, request, dateEnd, isFulfilled}) {
        this.user = new User(user);
        this.received = received.map(receive => new Received(received));
        this.datePosted = datePosted;
        this.id = id;
        this.promise = promise;
        this.hashtags = hashtags;
        this.request = new Request(request);
        this.dateEnd = dateEnd;
        this.isFulfilled = isFulfilled;
    }
}

export const getAllBarters = (displayName) => {
    return new Promise((resolve, reject) => {
        API.get(`/barter/getall?displayName=${displayName}`)
            .then(res => res.data)
            .then(barters => resolve(barters.map(barter => new Barter(barter))))
            .catch(err => reject(err));
    })
}