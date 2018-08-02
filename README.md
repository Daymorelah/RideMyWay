[![Build Status](https://travis-ci.org/Daymorelah/RideMyWay.svg?branch=ft-user-signup-2178134)](https://travis-ci.org/Daymorelah/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/Daymorelah/RideMyWay/badge.svg?branch=ft-update-user-details-2178134)](https://coveralls.io/github/Daymorelah/RideMyWay?branch=ft-update-user-details-2178134)
[![Maintainability](https://api.codeclimate.com/v1/badges/7b39a3c4a60595176942/maintainability)](https://codeclimate.com/github/Daymorelah/RideMyWay/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7b39a3c4a60595176942/test_coverage)](https://codeclimate.com/github/Daymorelah/RideMyWay/test_coverage)

# RideMyWay
Ride-my-way App is a carpooling application that provides users with the ability to create ride offers and can also join available ride offers of their friends.

Features:
- User can signup and signin to the application
- Users can create ride offers
- Users can view all available ride-offers
- Users can view the details of a ride-offer created by their friends
- Users can send requests to join a ride-offer belonging to only a friend on the app
- Users can view the requests to the ride-offers they created
- Users can either accept or reject a ride request
- Users can send friend requests to other users so that they can become friends
- A user can either accept or reject a friend request
- A user can either accept or reject a request to a ride created by the user
- The number of available seats for a ride-offer determines the number of requests a ride-offer can get at every point in time.

## TECHNOLOGIES
#### Client Side:
The frontend was implemented using:
* [HTML](https://www.w3schools.com/Html/) A standard markup language for creating Web pages
* [CSS](https://www.w3schools.com/css/css_intro.asp) This describes how HTML elements are to be displayed on screen.
* [JavaScript](https://www.w3schools.com/js/default.asp) A programming language of HTML and the Web.

#### Backend:
The Backend was implemented using: 
 * [Node](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
 * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework 
 
 ## API Documentation
 The RESTful API for the back-end is documented using [Swagger](https://swagger.io/) and hosted on [SwaggerHub](https://app.swaggerhub.com/signup). Feel free to use this documentation to understand how to consume the API.
 
 ## INSTALLATION
 * install [Node js](https://nodejs.org/en/)
 * Clone the repository `git clone https://github.com/Daymorelah/RideMyWay.git` 
 * Navigate to the location in your terminal
 * Run `npm install` to install dependencies
 * Run `npm start` to get the app started on your local machine.
 
 ## TESTING
 #### Server side:
To run tests for the server side
* Navigate to the project location in your terminal
* Run `npm run test` to run tests on the app
* Run `npm run test-coverage` to run test coverage with [Istanbul](https://istanbul.js.org/) on the app

The UI (_static_) templates for this App can be viewed on [GitHub Pages](https://pages.github.com/) via the URL below :
* [signup page:](https://daymorelah.github.io/RideMyWay/UI/html/signup.html)

## Contributing
* Fork this repository
* Clone to your local environment: https://github.com/Daymorelah/RideMyWay.git
* Create your feature branch: git checkout -b ft-my-new-feature-2178134
* Commit your changes: git commit -am 'Add some feature'
* Write test for the new features
* Push to the branch: git push origin ft-my-new-feature-2178134
* Submit a pull request against the development branch

## Limitations
* Users don't get real-time notification when their request to a ride is being rejected or accepted
* Users don't get real-time notification when their friend request is being rejected or accepted

## Author
* Ademola Hussain

## Licence 
[MIT License](https://github.com/Kenec/PostIt/blob/master/LICENSE)
