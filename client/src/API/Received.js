export class Received {
    constructor({ displayName, bitmoji, fullName, payment, frequency, comment }) {
        this.displayName = displayName;
        this.fullName = fullName;
        this.payment = payment;
        this.frequency = frequency;
        this.comment = comment;
        this.bitmoji = bitmoji;
    }

    udpate = () => ({
        displayName: this.displayName,
        bitmoji: this.bitmoji,
        fullName: this.fullName,
        age: this.age,
        university: this.university,
        major: this.major,
        classification: this.classification,
        location: this.location,
        payment: this.payment,
        frequency: this.frequency,
        comment: this.comment,
    })
}