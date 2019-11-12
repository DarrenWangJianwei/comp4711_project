
CREATE TABLE dbo.userPlayers (
    user_id INT PRIMARY KEY IDENTITY (1, 1),
    email VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    image_url VARCHAR (255),
    about VARCHAR (255),
    country VARCHAR(50),
    likes INT,
    dob Date
);


CREATE TABLE dbo.post (
    post_id INT PRIMARY KEY IDENTITY (1, 1),
    subject VARCHAR (255) NOT NULL,
    details VARCHAR (255),
    topic VARCHAR (50), 
    user_id INT FOREIGN KEY REFERENCES dbo.userPlayers (user_id)
);

CREATE TABLE dbo.reply(
    reply_id INT PRIMARY KEY IDENTITY (1, 1),
    content VARCHAR (255),
    data Date NOT NULL,
    post_id INT FOREIGN KEY REFERENCES dbo.post (post_id),
    user_id INT FOREIGN KEY REFERENCES dbo.userPlayers(user_id),
)