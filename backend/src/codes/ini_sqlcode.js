sqlcode = 

`CREATE TABLE IF NOT EXISTS author ( 
    id     integer PRIMARY KEY,  
    first_name   varchar(40), 
	last_name   varchar(60) ); 

CREATE TABLE IF NOT EXISTS book ( 
    id     integer PRIMARY KEY,  
    title  varchar(100), 
	subtitle   varchar(200) ); 

CREATE TABLE IF NOT EXISTS exemplary ( 
	author     integer NOT NULL, 
	book   	integer NOT NULL, 

	PRIMARY KEY (author, book), 
	CONSTRAINT author_fkey FOREIGN KEY (author) 
		REFERENCES author (id) 
		ON UPDATE NO ACTION ON DELETE CASCADE, 
	CONSTRAINT book_fkey FOREIGN KEY (book)  
		REFERENCES book (id) 
		ON UPDATE NO ACTION ON DELETE CASCADE )`

export default sqlcode