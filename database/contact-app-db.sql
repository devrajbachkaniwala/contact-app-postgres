CREATE TABLE Users (
	userId BIGSERIAL PRIMARY KEY,
	userName VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL,
	password VARCHAR(20) NOT NULL,
	userPhoto BYTEA,
	isActive boolean,
	createdAt DATE DEFAULT NOW(),
	modifiedAt DATE
);

CREATE TABLE Contacts (
  companyId BIGINT,
  userId BIGINT NOT NULL,
  contactId BIGSERIAL PRIMARY KEY,
  contactPhoto BYTEA,
  prefix VARCHAR(100),
  firstName VARCHAR(100) NOT NULL,
  middleName VARCHAR(100),
  lastName VARCHAR(100),
  suffix VARCHAR(100),
  phoneticFirst VARCHAR(100),
  phoneticMiddle VARCHAR(100),
  phoneticLast VARCHAR(100),
  nickname VARCHAR(100),
  fileAs VARCHAR(100),
  dateOfBirth DATE,
  relationship VARCHAR(10),
  chat VARCHAR(200),
  internetCall VARCHAR(100),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  customField VARCHAR(100),
  event VARCHAR(150),
  CONSTRAINT FK_Contacts_ContactCompanies FOREIGN KEY(companyId) REFERENCES ContactCompanies(companyId) ON DELETE SET NULL,
  CONSTRAINT FK_Contacts_Users FOREIGN KEY(userId) REFERENCES Users(userId) ON DELETE CASCADE
);


CREATE TABLE ContactAddresses (
  contactId BIGINT NOT NULL,
  addressId BIGSERIAL PRIMARY KEY,
  country VARCHAR(56),
  state VARCHAR(100),
  city VARCHAR(100),
  streetAddress VARCHAR(150),
  streetAddressLine2 VARCHAR(150),
  pincode NUMERIC(6),
  poBox VARCHAR(150),
  type VARCHAR(20),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_ContactAddresses_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);

CREATE TABLE ContactTelephones (
  contactId BIGINT NOT NULL,
  telephoneId BIGSERIAL PRIMARY KEY,
  countryCode VARCHAR(4) NOT NULL,
  number NUMERIC(13) NOT NULL,
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_ContactTelephones_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);


CREATE TABLE ContactCompanies (
  companyId BIGSERIAL PRIMARY KEY,
  company VARCHAR(150),
  jobTitle VARCHAR(150),
  department VARCHAR(150),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE
);


CREATE TABLE ContactEmailAddresses (
  contactId BIGINT NOT NULL,
  emailAddressId BIGSERIAL PRIMARY KEY,
  email VARCHAR(150),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_ContactEmailAddresses_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);


CREATE TABLE ContactNotes (
  contactId BIGINT NOT NULL,
  noteId BIGSERIAL PRIMARY KEY,
  content VARCHAR(250),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_ContactNotes_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);

CREATE TABLE ContactWebsites (
  contactId BIGINT NOT NULL,
  websiteId BIGSERIAL PRIMARY KEY,
  websiteName VARCHAR(250),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_ContactWebsites_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);

CREATE TABLE ContactSocials (
  contactId BIGINT NOT NULL,
  socialId BIGSERIAL PRIMARY KEY,
  whatsapp VARCHAR(150),
  facebook VARCHAR(150),
  twitter VARCHAR(150),
  snapchat VARCHAR(150),
  CONSTRAINT FK_ContactSocials_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE
);

CREATE TABLE Labels (
  userId INT NOT NULL,
  labelId BIGSERIAL PRIMARY KEY,
  labelName VARCHAR(150),
  createdAt DATE DEFAULT NOW(),
  modifiedAt DATE,
  CONSTRAINT FK_Labels_Users FOREIGN KEY(userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE ContactLabels (
  contactId INT NOT NULL,
  labelId INT NOT NULL,
  CONSTRAINT FK_ContactLabels_Contacts FOREIGN KEY(contactId) REFERENCES Contacts(contactId) ON DELETE CASCADE,
  CONSTRAINT FK_ContactLabels_Labels FOREIGN KEY(labelId) REFERENCES Labels(labelId) ON DELETE CASCADE
);

