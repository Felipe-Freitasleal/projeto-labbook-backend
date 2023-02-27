-- Active: 1675628447508@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0),
        dislikes INTEGER DEFAULT(0),
        created_at TEXT DEFAULT(DATETIME()),
        update_at TEXT DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE likes_dislikes;

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "user0001",
        "Laura",
        "Laura@email.com",
        "laura123",
        "user"
    ), (
        "user0002",
        "Bella",
        "bella@email.com",
        "bella123",
        "user"
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES (
        "post0001",
        "user0001",
        "Olá, essa é a primeira postagem por SQL"
    ), ("post0002", "user0001", "Hi!");

INSERT INTO
    likes_dislikes (user_id, post_id, like)
VALUES ("user0002", "post0001", 1);

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

SELECT
    users.id,
    posts.id,
    posts.content
FROM likes_dislikes RIGHT
    JOIN users ON users.id = likes_dislikes.user_id
    LEFT JOIN posts ON posts.id = likes_dislikes.post_id;

UPDATE posts
SET likes = 1
WHERE id = 'post0001';