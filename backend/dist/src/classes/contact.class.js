"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactLabelModel = exports.ContactWebsiteModel = exports.ContactSocialModel = exports.ContactNoteModel = exports.ContactEmailAddressModel = exports.ContactAddressModel = exports.ContactTelephoneModel = exports.ContactModel = void 0;
const db_1 = require("../database/db");
class Contact {
    // returns a specific contact of a user using contactId and userId of that user
    static get(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = (yield db_1.db.read.columns('*').tables('Contacts').where('userId', '=', userId).where('contactId', '=', contactId, false).get()).rows;
                return contact;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // returns a list of contacts of a specific user using userId of that user
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = (yield db_1.db.read.columns('*').tables('Contacts').where('userId', '=', userId).get()).rows;
                return contacts;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // create a new contact
    static create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = (yield db_1.db.write.table('Contacts').insert(contact).execute()).rowCount;
                return (newContact == 1) ? { message: 'New contact created successfully', result: true } : { message: 'Failed to create contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    // update an existing contact
    static update(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContact = (yield db_1.db.update.table('Contacts').update(contact).where('contactId', '=', contact.contactId).execute()).rowCount;
                return (updatedContact == 1) ? { message: 'Contact updated successfully', result: true } : { message: 'Failed to update contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    // delete a specific contact using its contactId
    static delete(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = (yield db_1.db.delete.table('Contacts').where('userId', '=', userId).where('contactId', '=', contactId).delete()).rowCount;
                return (contact == 1) ? { message: 'Contact deleted successfully', result: true } : { message: 'Failed to delete contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    // returns a list of contacts which includes telephones, addresses, notes, emailAddresses, websites, socials and labels of a specific user using userId
    static listContacts(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = `select row_to_json(contact, true) as contact
            from ( select *, 
             ( select array_to_json(array_agg(telephones), true) as telephones from ( select contactTelephones.contactId, telephoneId, number, countrycode, contactTelephones.createdAt, contactTelephones.modifiedAt from contacttelephones inner join contacts on contacts.contactid = contacttelephones.contactid where contacttelephones.contactid = $1 ) telephones ),
            
            ( select array_to_json(array_agg(addresses), true) as addresses from ( select contactAddresses.contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, ContactAddresses.createdAt, ContactAddresses.modifiedAt from ContactAddresses inner join Contacts on Contacts.contactId = ContactAddresses.contactId where ContactAddresses.contactId = $2 ) addresses ),
            
            ( select array_to_json(array_agg(notes), true) as notes from ( select ContactNotes.contactId, noteId, content, ContactNotes.createdAt, ContactNotes.modifiedAt from ContactNotes INNER JOIN Contacts ON Contacts.contactId = ContactNotes.contactId WHERE ContactNotes.contactId = $3 ) notes ),
            
            ( SELECT array_to_json( array_agg(emailAddresses), true ) as emailAddresses FROM ( SELECT ContactEmailAddresses.contactId, emailAddressId, email, ContactEmailAddresses.createdAt, ContactEmailAddresses.modifiedAt FROM ContactEmailAddresses INNER JOIN Contacts on Contacts.contactId = ContactEmailAddresses.contactId WHERE ContactEmailAddresses.contactId = $4 ) emailAddresses ),
            
            ( SELECT array_to_json( array_agg(websites), true ) as websites FROM ( SELECT ContactWebsites.contactId, websiteId, websiteName, ContactWebsites.createdAt, ContactWebsites.modifiedAt FROM ContactWebsites INNER JOIN Contacts ON Contacts.contactId = ContactWebsites.contactId WHERE ContactWebsites.contactId = $5 ) websites ),
            
            ( SELECT array_to_json( array_agg(socials), true ) as socials FROM ( SELECT ContactSocials.contactId, socialId, whatsapp, facebook, twitter, snapchat FROM ContactSocials INNER JOIN Contacts ON Contacts.contactId = ContactSocials.contactId WHERE ContactSocials.contactId = $6 ) socials ),
            
            ( SELECT array_to_json( array_agg(labels), true ) as labels FROM ( SELECT ContactLabels.contactId, ContactLabels.labelId, labelName, createdAt, modifiedAt FROM ContactLabels INNER JOIN Labels ON Labels.labelId = ContactLabels.labelId WHERE ContactLabels.contactId = $7 AND Labels.userId = $8 ) labels )
            
            FROM Contacts WHERE Contacts.userId = $9 AND Contacts.contactId = $10  ) contact`;
                const totalContacts = yield db_1.pool.query(`SELECT contactId FROM Contacts WHERE userId = $1`, [userId]);
                const contacts = [];
                while (totalContacts.rows.length) {
                    const contactId = (_a = totalContacts.rows.shift()) === null || _a === void 0 ? void 0 : _a.contactid;
                    const contact = yield db_1.pool.query(queryString, [contactId, contactId, contactId, contactId, contactId, contactId, contactId, userId, userId, contactId]);
                    contacts.push(contact.rows.pop());
                }
                return contacts;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a specific contact which includes telephones, addresses, notes, emailAddresses, websites, socials and labels of a specific user using userId and contactId
    static getContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = `select row_to_json(contact, true) as contact
            from ( select *, 
             ( select array_to_json(array_agg(telephones), true) as telephones from ( select contactTelephones.contactId, telephoneId, number, countrycode, contactTelephones.createdAt, contactTelephones.modifiedAt from contacttelephones inner join contacts on contacts.contactid = contacttelephones.contactid where contacttelephones.contactid = $1 ) telephones ),
            
            ( select array_to_json(array_agg(addresses), true) as addresses from ( select contactAddresses.contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, ContactAddresses.createdAt, ContactAddresses.modifiedAt from ContactAddresses inner join Contacts on Contacts.contactId = ContactAddresses.contactId where ContactAddresses.contactId = $2 ) addresses ),
            
            ( select array_to_json(array_agg(notes), true) as notes from ( select ContactNotes.contactId, noteId, content, ContactNotes.createdAt, ContactNotes.modifiedAt from ContactNotes INNER JOIN Contacts ON Contacts.contactId = ContactNotes.contactId WHERE ContactNotes.contactId = $3 ) notes ),
            
            ( SELECT array_to_json( array_agg(emailAddresses), true ) as emailAddresses FROM ( SELECT ContactEmailAddresses.contactId, emailAddressId, email, ContactEmailAddresses.createdAt, ContactEmailAddresses.modifiedAt FROM ContactEmailAddresses INNER JOIN Contacts on Contacts.contactId = ContactEmailAddresses.contactId WHERE ContactEmailAddresses.contactId = $4 ) emailAddresses ),
            
            ( SELECT array_to_json( array_agg(websites), true ) as websites FROM ( SELECT ContactWebsites.contactId, websiteId, websiteName, ContactWebsites.createdAt, ContactWebsites.modifiedAt FROM ContactWebsites INNER JOIN Contacts ON Contacts.contactId = ContactWebsites.contactId WHERE ContactWebsites.contactId = $5 ) websites ),
            
            ( SELECT array_to_json( array_agg(socials), true ) as socials FROM ( SELECT ContactSocials.contactId, socialId, whatsapp, facebook, twitter, snapchat FROM ContactSocials INNER JOIN Contacts ON Contacts.contactId = ContactSocials.contactId WHERE ContactSocials.contactId = $6 ) socials ),
            
            ( SELECT array_to_json( array_agg(labels), true ) as labels FROM ( SELECT ContactLabels.contactId, ContactLabels.labelId, labelName, createdAt, modifiedAt FROM ContactLabels INNER JOIN Labels ON Labels.labelId = ContactLabels.labelId WHERE ContactLabels.contactId = $7 AND Labels.userId = $8 ) labels )
            
            FROM Contacts WHERE Contacts.userId = $9 AND Contacts.contactId = $10  ) contact`;
                const contactDetail = yield db_1.pool.query(queryString, [contactId, contactId, contactId, contactId, contactId, contactId, contactId, userId, userId, contactId]);
                return contactDetail.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static createContact(contact, telephones, addresses, emailAddresses, notes, socials, websites, contactLabels) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactQueryString = `INSERT INTO Contacts(userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department)
            SELECT userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department 
            FROM json_populate_record(null::Contacts, '${JSON.stringify(contact)}')`;
                const telephonesQueryString = `INSERT INTO ContactTelephones(contactId, telephoneId, countryCode, number)
            SELECT contactId, telephoneId, countryCode, number
            FROM json_populate_recordset(null::ContactTelephones, '${JSON.stringify(telephones)}')`;
                const addressesQueryString = `INSERT INTO ContactAddresses(contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type)
            SELECT contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type
            FROM json_populate_recordset(null::ContactAddresses, '${JSON.stringify(addresses)}')`;
                const emailAddressesQueryString = `INSERT INTO ContactEmailAddresses(contactId, emailAddressId, email)
            SELECT contactId, emailAddressId, email 
            FROM json_populate_recordset(null::ContactEmailAddresses, '${JSON.stringify(emailAddresses)}')`;
                const notesQueryString = `INSERT INTO ContactNotes(contactId, noteId, content)
            SELECT contactId, noteId, content 
            FROM json_populate_recordset(null::ContactNotes, '${JSON.stringify(notes)}')`;
                const socialsQueryString = `INSERT INTO ContactSocials(contactId, socialId, whatsapp, facebook, twitter, snapchat)
            SELECT contactId, socialId, whatsapp, facebook, twitter, snapchat 
            FROM json_populate_recordset(null::ContactSocials, '${JSON.stringify(socials)}')`;
                const websitesQueryString = `INSERT INTO ContactWebsites(contactId, websiteId, websiteName)
            SELECT contactId, websiteId, websiteName 
            FROM json_populate_recordset(null::ContactWebsites, '${JSON.stringify(websites)}')`;
                const contactLabelsQueryString = `INSERT INTO ContactLabels(contactId, labelId)
            SELECT contactId, labelId
            FROM json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}')`;
                const contactResult = yield db_1.pool.query(contactQueryString);
                const telephonesResult = yield db_1.pool.query(telephonesQueryString);
                const addressesResult = yield db_1.pool.query(addressesQueryString);
                const emailAddressesResult = yield db_1.pool.query(emailAddressesQueryString);
                const notesResult = yield db_1.pool.query(notesQueryString);
                const socialsResult = yield db_1.pool.query(socialsQueryString);
                const websitesResult = yield db_1.pool.query(websitesQueryString);
                const contactLabelsResult = yield db_1.pool.query(contactLabelsQueryString);
                return { contactResult, telephonesResult, addressesResult, emailAddressesResult, notesResult, socialsResult, websitesResult, contactLabelsResult };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static updateContact(contactId, contact, telephones, addresses, emailAddresses, notes, socials, websites, contactLabels) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactQueryString = `UPDATE Contacts SET (contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt) = 
            ( SELECT contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt
            FROM json_populate_record(null::Contacts, '${JSON.stringify(contact)}' ) 
            WHERE contactid = $1)
            WHERE Contacts.contactId = $2 `;
                const contactResult = yield db_1.pool.query(contactQueryString, [contactId, contactId]);
                let telephonesResult = [];
                for (let i = 0; i < telephones.length; i++) {
                    const telephone = telephones[i];
                    const telephoneQueryString = `UPDATE ContactTelephones SET (countryCode, number, modifiedAt) = 
                ( SELECT countryCode, number, modifiedAt
                FROM json_populate_record(null::ContactTelephones, '${JSON.stringify(telephone)}') 
                WHERE telephoneid = $1)
                WHERE ContactTelephones.contactId = $2 AND ContactTelephones.telephoneId = $3`;
                    const telephoneResult = yield db_1.pool.query(telephoneQueryString, [telephone.telephoneid, contactId, telephone.telephoneid]);
                    telephonesResult.push(telephoneResult);
                }
                let addressesResult = [];
                for (let i = 0; i < addresses.length; i++) {
                    const address = addresses[i];
                    const addressQueryString = `UPDATE ContactAddresses SET (country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, modifiedAt) = 
                ( SELECT country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, modifiedAt
                FROM json_populate_record(null::ContactAddresses, '${JSON.stringify(address)}') 
                WHERE addressid = $1)
                WHERE ContactAddresses.contactId = $2 AND ContactAddresses.addressId = $3`;
                    const addressResult = yield db_1.pool.query(addressQueryString, [address.addressid, contactId, address.addressid]);
                    addressesResult.push(addressResult);
                }
                let emailAddressesResult = [];
                for (let i = 0; i < emailAddresses.length; i++) {
                    const emailAddress = emailAddresses[i];
                    const emailAddressQueryString = `UPDATE ContactEmailAddresses SET (email, modifiedAt) = 
                ( SELECT email, modifiedAt 
                FROM json_populate_record(null::ContactEmailAddresses, '${JSON.stringify(emailAddress)}') 
                WHERE emailaddressid = $1)
                WHERE ContactEmailAddresses.contactId = $2 AND ContactEmailAddresses.emailAddressId = $3`;
                    const emailAddressResult = yield db_1.pool.query(emailAddressQueryString, [emailAddress.emailaddressid, contactId, emailAddress.emailaddressid]);
                    emailAddressesResult.push(emailAddressResult);
                }
                let notesResult = [];
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    const noteQueryString = `UPDATE ContactNotes SET (content, modifiedAt) = 
                ( SELECT content, modifiedAt
                FROM json_populate_record(null::ContactNotes, '${JSON.stringify(note)}')
                WHERE noteid = $1 )
                WHERE ContactNotes.contactId = $2 AND ContactNotes.noteId = $3`;
                    const noteResult = yield db_1.pool.query(noteQueryString, [note.noteid, contactId, note.noteid]);
                    notesResult.push(noteResult);
                }
                let socialsResult = [];
                for (let i = 0; i < socials.length; i++) {
                    const social = socials[i];
                    const socialQueryString = `UPDATE ContactSocials SET (whatsapp, facebook, twitter, snapchat) = 
                ( SELECT whatsapp, facebook, twitter, snapchat
                FROM json_populate_record(null::ContactSocials, '${JSON.stringify(social)}')
                WHERE socialid = $1 )
                WHERE ContactSocials.contactId = $2 AND ContactSocials.socialId = $3`;
                    const socialResult = yield db_1.pool.query(socialQueryString, [social.socialid, contactId, social.socialid]);
                    socialsResult.push(socialResult);
                }
                let websitesResult = [];
                for (let i = 0; i < websites.length; i++) {
                    const website = websites[i];
                    const websiteQueryString = `UPDATE ContactWebsites SET (websiteName, modifiedAt) = 
                ( SELECT websiteName, modifiedAt
                FROM json_populate_record(null::ContactWebsites, '${JSON.stringify(website)}')
                WHERE websiteid = $1 )
                WHERE ContactWebsites.contactId = $2 AND ContactWebsites.websiteId = $3`;
                    const websiteResult = yield db_1.pool.query(websiteQueryString, [website.websiteid, contactId, website.websiteid]);
                    websitesResult.push(websiteResult);
                }
                let contactLabelsResult = {};
                if (contactLabels.length) {
                    const removeContactLabelResult = yield db_1.db.delete.table('ContactLabels').where('contactId', '=', contactId).delete();
                    const contactLabelsQueryString = `INSERT INTO ContactLabels(contactId, labelId)
                ( SELECT contactId, labelId FROM json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}') )`;
                    contactLabelsResult = yield db_1.pool.query(contactLabelsQueryString);
                }
                return { contactResult, telephonesResult, addressesResult, emailAddressesResult, notesResult, socialsResult, websitesResult, contactLabelsResult };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = Contact;
class ContactModel {
    constructor(userid, contactid, contactphoto = null, prefix = null, firstname, middlename = null, lastname = null, suffix = null, phoneticfirst = null, phoneticmiddle = null, phoneticlast = null, nickname = null, fileas = null, dateofbirth = null, relationship = null, chat = null, internetcall = null, customfield = null, event = null, company = null, jobtitle = null, department = null, createdat, modifiedat) {
        this.userid = userid;
        this.contactid = contactid;
        this.contactphoto = contactphoto;
        this.prefix = prefix;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.suffix = suffix;
        this.phoneticfirst = phoneticfirst;
        this.phoneticmiddle = phoneticmiddle;
        this.phoneticlast = phoneticlast;
        this.nickname = nickname;
        this.fileas = fileas;
        this.dateofbirth = dateofbirth;
        this.relationship = relationship;
        this.chat = chat;
        this.internetcall = internetcall;
        this.customfield = customfield;
        this.event = event;
        this.company = company;
        this.jobtitle = jobtitle;
        this.department = department;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactModel = ContactModel;
class ContactTelephoneModel {
    constructor(contactid, telephoneid, countrycode, number, createdat, modifiedat) {
        this.contactid = contactid;
        this.telephoneid = telephoneid;
        this.countrycode = countrycode;
        this.number = number;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactTelephoneModel = ContactTelephoneModel;
class ContactAddressModel {
    constructor(contactid, addressid, country = null, state = null, city = null, streetaddress = null, streetaddressline2 = null, pincode = null, pobox = null, type = null, createdat, modifiedat) {
        this.contactid = contactid;
        this.addressid = addressid;
        this.country = country;
        this.state = state;
        this.city = city;
        this.streetaddress = streetaddress;
        this.streetaddressline2 = streetaddressline2;
        this.pincode = pincode;
        this.pobox = pobox;
        this.type = type;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactAddressModel = ContactAddressModel;
class ContactEmailAddressModel {
    constructor(contactid, emailaddressid, email = null, createdat, modifiedat) {
        this.contactid = contactid;
        this.emailaddressid = emailaddressid;
        this.email = email;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactEmailAddressModel = ContactEmailAddressModel;
class ContactNoteModel {
    constructor(contactid, noteid, content = null, createdat, modifiedat) {
        this.contactid = contactid;
        this.noteid = noteid;
        this.content = content;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactNoteModel = ContactNoteModel;
class ContactSocialModel {
    constructor(contactid, socialid, whatsapp = null, facebook = null, twitter = null, snapchat = null) {
        this.contactid = contactid;
        this.socialid = socialid;
        this.whatsapp = whatsapp;
        this.facebook = facebook;
        this.twitter = twitter;
        this.snapchat = snapchat;
    }
}
exports.ContactSocialModel = ContactSocialModel;
class ContactWebsiteModel {
    constructor(contactid, websiteid, websitename = null, createdat, modifiedat) {
        this.contactid = contactid;
        this.websiteid = websiteid;
        this.websitename = websitename;
        this.createdat = createdat;
        this.modifiedat = modifiedat;
    }
}
exports.ContactWebsiteModel = ContactWebsiteModel;
class ContactLabelModel {
    constructor(contactid, labelid) {
        this.contactid = contactid;
        this.labelid = labelid;
    }
}
exports.ContactLabelModel = ContactLabelModel;
//# sourceMappingURL=contact.class.js.map