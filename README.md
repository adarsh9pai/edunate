# edunate:  - Winner 🏆, 1st Prize 🥇 and Best Use of SnapKit 👻 - MLH HackHouston 2019

# Inspiration

We came into the hackathon wanting to solve an actual problem college students faced throughout the world. One thing we observed was that lack of money is one of the biggest reasons college students either don't achieve their goals or are hesistant towards risks. We wanted to solve that. Some things that motivated us towards this goal - 

[1] : ABC News: https://abc13.com/education/tsu-students-use-hash-tag-to-shed-light-on-problems-on-campus/991459/

[2] : Subscription fees for Adobe's Creative Cloud, LeetCode etc.


# What it does

The platform allows you to micro-donate to students for their academic needs, help others by tutoring for classes and other essential tools needed in the industry and exchange expensive commodities like textbooks, electronics etc or even post something you need!

# Stack

Backend: Express + NodeJS hosted on Amazon Lightsail

Frontend: JavaScript + React

Database: Google Cloud Platform FireStore

Prominent APIs: Snapchat's SnapKit, Stripe


# Completion Status

This was built during under 24 hours at MLH HackHouston 2019. Given the timeframe in which it was completed, this probably has some bugs. If you find one, please put up an issue on this repository.

# How to make this code work

Create a config.js file in the client and server subdirectories and paste this and add your keys:

<pre><code>
module.exports = {
    clientID: 'SNAPCHAT CLIENT ID',
    clientSecret: 'SNAPCHAT CLIENT SECRET',
    secret: "SESSION SECRET",
    publishable_key : 'STRIPE PUBLISHABLE KEY',
    secret_key : 'STRIPE SECRET KEY'

}
</pre></code>
