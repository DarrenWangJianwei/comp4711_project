drop table dbo.message
drop table dbo.conversation
drop table dbo.reply
drop table dbo.post
drop table dbo.usersProfile;

CREATE TABLE dbo.usersProfile (
    user_id INT PRIMARY KEY IDENTITY (1, 1),
    firstName VARCHAR (50) NOT NULL,
    lastName VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    image_url VARCHAR (255),
    about VARCHAR (255),
    country VARCHAR(50),
    likes INT DEFAULT 0,
    dob Date
);


CREATE TABLE dbo.post (
    post_id INT PRIMARY KEY IDENTITY (1, 1),
    subject VARCHAR (255) NOT NULL,
    details VARCHAR (255),
    topic VARCHAR (50),
    post_date smalldatetime NOT NULL,
    user_id INT FOREIGN KEY REFERENCES dbo.usersProfile (user_id)
);

CREATE TABLE dbo.reply(
    reply_id INT PRIMARY KEY IDENTITY (1, 1),
    content VARCHAR (255),
    reply_date smalldatetime NOT NULL,
    post_id INT FOREIGN KEY REFERENCES dbo.post (post_id),
    user_id INT FOREIGN KEY REFERENCES dbo.usersProfile(user_id),
)
CREATE TABLE dbo.conversation(
    conversation_id INT PRIMARY KEY IDENTITY (1,1),
    conversation_date smalldatetime NOT NULL,
    user1_user_id INT FOREIGN KEY REFERENCES dbo.usersProfile(user_id),
    user2_user_id INT FOREIGN KEY REFERENCES dbo.usersProfile(user_id),
)

CREATE TABLE dbo.message(
    message_id INT PRIMARY KEY IDENTITY (1,1),
    conversation_id INT FOREIGN KEY REFERENCES dbo.conversation(conversation_id),
    content VARCHAR(255),
    message_date smalldatetime NOT NULL,
    sender_user_id INT FOREIGN KEY REFERENCES dbo.usersProfile(user_id),
    receiver_user_id INT FOREIGN KEY REFERENCES dbo.usersProfile(user_id),
    isRead tinyint NOT NULL DEFAULT 0
)

INSERT INTO dbo.usersProfile (email,firstName,lastName,password,image_url,about,country,likes,dob)
VALUES('darren.wjy1990@gmail.com','Darren','Wang','password','https://randomuser.me/api/portraits/med/men/15.jpg','10 year of experience working in tech','China',0,'1990-10-28');
INSERT INTO dbo.usersProfile (email,firstName,lastName,password,image_url,about,country,likes,dob)
VALUES('test@gmail.com','testFirstName','testLastName','password','https://randomuser.me/api/portraits/med/men/5.jpg','students in BCIT','Canada',0,'1989-03-01');
INSERT INTO dbo.usersProfile (email,firstName,lastName,password,image_url,about,country,likes,dob)
VALUES('test2@gmail.com','test2FirstName','test2lastName','password','https://randomuser.me/api/portraits/med/men/35.jpg','Co-op Students','Canada',0,'1991-02-23');

INSERT INTO dbo.post(subject,details,topic,post_date,user_id)
VALUES('User setting deleted','After I logged into my node, i saw that the setting were deleted after i restarted my server. I had installed nodemon then it started','nodejs','2018-06-11 23:52:09',1);
INSERT INTO dbo.post(subject,details,topic,post_date,user_id)
VALUES('Testing topic 2','just for testing, no too much info','php','2018-07-05 23:52:09',1);
INSERT INTO dbo.post(subject,details,topic,post_date,user_id)
VALUES('Memory leak','My php application usually crashes after, I do not use it for a while, I think because I installed composer, it consuling more...','php','2018-11-23 23:52:09',2);

INSERT INTO dbo.reply(content,reply_date,post_id,user_id)
VALUES('something replied by Darren','2019-1-20 23:52:09',1,1);
INSERT INTO dbo.reply(content,reply_date,post_id,user_id)
VALUES('something replied by Darren','2019-1-25 23:52:09',3,1);
INSERT INTO dbo.reply(content,reply_date,post_id,user_id)
VALUES('something replied by user_id 2','2019-02-01 23:52:09',1,2);
INSERT INTO dbo.reply(content,reply_date,post_id,user_id)
VALUES('something replied by user_id 3','2019-03-04 23:52:09',1,3);
INSERT INTO dbo.reply(content,reply_date,post_id,user_id)
VALUES('something replied by user_id 3','2019-05-06 23:52:09',3,3);


INSERT INTO dbo.conversation(conversation_date,user1_user_id,user2_user_id)
VALUES('2019-05-06 23:55:09',2,1)
INSERT INTO dbo.conversation(conversation_date,user1_user_id,user2_user_id)
VALUES('2019-05-06 23:57:09',3,1)
INSERT INTO dbo.conversation(conversation_date,user1_user_id,user2_user_id)
VALUES('2019-05-06 23:56:09',1,4)


INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(1,'message from user_id 1','2019-05-06 23:52:09',1,2)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(1,'message from user_id 2','2019-05-06 23:53:09',2,1)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(1,'message from user_id 1','2019-05-06 23:54:09',1,2)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(1,'message from user_id 2','2019-05-06 23:55:09',2,1)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(2,'message from user_id 1','2019-05-06 23:56:09',1,3)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(2,'message from user_id 3','2019-05-06 23:57:09',3,1)
INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id)
VALUES(3,'message from user_id 1','2019-05-06 23:56:09',1,4)