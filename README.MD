# Survytics

I've mentions the challenges I've faced in this backend repository.

- [Live site link](https://survytics-client.web.app) 

- User Roles: There're total four user roles in this website. User, pro user, surveyor, admin and every one has their unique access to this website. User role based functionaliy and accessiblity was challenging.

- Feedback Modal: Admin and users can send feeback messages to the surveyor. Users by reporting on a survey and admin when he unpublish a survey. I've used a single component for this feedback messages. I did conditional rendering a lot.

- Refactoring: The whole backend was done by mongodb and then I refactored the whole code base into mongooose. And in this project I used mongoose for the first time. Initailly it was tough and gradually I become familiar with mongoose syntax. Like for example in mongodb when you inject a data you use inserOne but in mongoose it is create. There are differences in two of them.