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
    // returns a list of contacts of a specific user using userId
    static listContacts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* const queryString = `select row_to_json(contact, true) as contact
                from ( select *,
                 ( select array_to_json(array_agg(telephones), true) as telephones from ( select contactTelephones.contactId, telephoneId, number, countrycode, contactTelephones.createdAt, contactTelephones.modifiedAt from contacttelephones inner join contacts on contacts.contactid = contacttelephones.contactid where contacttelephones.contactid = $1 ) telephones ),
                
                ( select array_to_json(array_agg(addresses), true) as addresses from ( select contactAddresses.contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, ContactAddresses.createdAt, ContactAddresses.modifiedAt from ContactAddresses inner join Contacts on Contacts.contactId = ContactAddresses.contactId where ContactAddresses.contactId = $2 ) addresses ),
                
                ( select array_to_json(array_agg(notes), true) as notes from ( select ContactNotes.contactId, noteId, content, ContactNotes.createdAt, ContactNotes.modifiedAt from ContactNotes INNER JOIN Contacts ON Contacts.contactId = ContactNotes.contactId WHERE ContactNotes.contactId = $3 ) notes ),
                
                ( SELECT array_to_json( array_agg(emailAddresses), true ) as emailAddresses FROM ( SELECT ContactEmailAddresses.contactId, emailAddressId, email, ContactEmailAddresses.createdAt, ContactEmailAddresses.modifiedAt FROM ContactEmailAddresses INNER JOIN Contacts on Contacts.contactId = ContactEmailAddresses.contactId WHERE ContactEmailAddresses.contactId = $4 ) emailAddresses ),
                
                ( SELECT array_to_json( array_agg(websites), true ) as websites FROM ( SELECT ContactWebsites.contactId, websiteId, websiteName, ContactWebsites.createdAt, ContactWebsites.modifiedAt FROM ContactWebsites INNER JOIN Contacts ON Contacts.contactId = ContactWebsites.contactId WHERE ContactWebsites.contactId = $5 ) websites ),
                
                ( SELECT array_to_json( array_agg(socials), true ) as socials FROM ( SELECT ContactSocials.contactId, socialId, whatsapp, facebook, twitter, snapchat FROM ContactSocials INNER JOIN Contacts ON Contacts.contactId = ContactSocials.contactId WHERE ContactSocials.contactId = $6 ) socials ),
                
                ( SELECT array_to_json( array_agg(labels), true ) as labels FROM ( SELECT ContactLabels.contactId, ContactLabels.labelId, labelName, createdAt, modifiedAt FROM ContactLabels INNER JOIN Labels ON Labels.labelId = ContactLabels.labelId WHERE ContactLabels.contactId = $7 AND Labels.userId = $8 ) labels )
                
                FROM Contacts WHERE Contacts.userId = $9 AND Contacts.contactId = $10  ) contact`; */
                /* const queryString = `select row_to_json(contact, true) as contact
                from ( select contactId, firstName, middleName,
                ( select array_to_json(array_agg(telephones), true) as telephones from ( select contactTelephones.contactId, telephoneId, number from contacttelephones inner join contacts on contacts.contactid = contacttelephones.contactid where contacttelephones.contactid = $1 ) telephones ),
                ( SELECT array_to_json( array_agg(labels), true ) as labels FROM ( SELECT ContactLabels.contactId, ContactLabels.labelId, labelName FROM ContactLabels INNER JOIN Labels ON Labels.labelId = ContactLabels.labelId WHERE ContactLabels.contactId = $2 AND Labels.userId = $3 ) labels )
                FROM Contacts WHERE Contacts.userId = $4 AND Contacts.contactId = $5  ) contact`; */
                //console.time('pool');
                //const totalContacts = pool.query(`SELECT contactId FROM Contacts WHERE userId = $1`, [userId]);
                //const totalContacts = (await db.read.columns('*').tables('Contacts').where('userId', '=', userId).get()).rows;
                //console.timeEnd('pool');
                //console.log(totalContacts);
                //return totalContacts;
                //return totalContacts.rows;
                /*  let contacts = [];
                 console.time('loop start');
                 const total = totalContacts.length; */
                //for (let i = 0; i < total; i++) {
                //const contactId = totalContacts[i].contactid;
                //const contact = pool.query(queryString, [ contactId, contactId, contactId, contactId, contactId, contactId, contactId, userId, userId, contactId ]);
                //const contact = await pool.query(queryString, [ contactId, contactId, contactId, contactId, contactId, contactId, contactId, userId, userId, contactId ]);
                //const contact = await pool.query(queryString, [ contactId, contactId, userId, userId, contactId ]);
                //const contact = Contact.getQuery(userId, contactId).get();
                /*  const telephoneQuery = db.read.columns(['contactTelephones.contactId, telephoneId, number, countrycode, contactTelephones.createdAt, contactTelephones.modifiedAt'])
                                     .tables('ContactTelephones').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactTelephones.contactId' ]).where('ContactTelephones.contactId', '=', contactId).query;
             
                 const telephonesQuery = db.read.columns('array_to_json(array_agg(telephones)) telephones').subquery(telephoneQuery.query, telephoneQuery.params, { afterFrom : true }, 'telephones').query;
  */
                /* const emailAddressQuery = db.read.columns( ['ContactEmailAddresses.contactId, emailAddressId, email, ContactEmailAddresses.createdAt, ContactEmailAddresses.modifiedAt'] )
                                    .tables('ContactEmailAddresses').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactEmailAddresses.contactId' ]).where('ContactEmailAddresses.contactId', '=', contactId).query;
            
                const emailAddressesQuery = db.read.columns('array_to_json(array_agg(emailAddresses)) emailAddresses').subquery(emailAddressQuery.query, emailAddressQuery.params, { afterFrom : true }, 'emailAddresses').query;
           */
                /* const labelQuery = db.read.columns( ['ContactLabels.contactId, ContactLabels.labelId, labelName, Labels.createdAt, Labels.modifiedAt'] )
                            .tables('ContactLabels').join('INNER JOIN', 'Labels', [ 'Labels.labelId', 'ContactLabels.labelId' ]).where('Labels.userId', '=', userId).where('ContactLabels.contactId', '=', contactId).query;

                const labelsQuery = db.read.columns('array_to_json(array_agg(labels)) labels').subquery(labelQuery.query, labelQuery.params, { afterFrom : true }, 'labels').query;

                const contact = db.read.columns('*').subquery(telephonesQuery.query, telephonesQuery.params,{ inColumn : true })
                            //.subquery(emailAddressesQuery.query, emailAddressesQuery.params, { inColumn : true })
                            .subquery(labelsQuery.query, labelsQuery.params, { inColumn : true })
                            .tables('Contacts').where('Contacts.userId', '=', userId).where('Contacts.contactId', '=', contactId)
                            .get();
                
                
                            
                contacts.push(contact); */
                //}
                //console.timeEnd('loop start');
                //console.log(contacts.values());
                //return [ ...contacts.values()];
                return (yield db_1.db.read.columns('userId, contactId, firstName, middleName, lastName').tables('Contacts').where('userId', '=', userId).get()).rows /* .then(res => res.map(contact => contact)) */;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns sql query which contains all the information of a particular contact using contactId and userId 
    static getQuery(userId, contactId) {
        const telephoneQuery = db_1.db.read.columns(['contactTelephones.contactId, telephoneId, number, countrycode'])
            .tables('ContactTelephones').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactTelephones.contactId']).where('ContactTelephones.contactId', '=', contactId).query;
        const telephonesQuery = db_1.db.read.columns('array_to_json(array_agg(telephones)) telephones').subquery(telephoneQuery.query, telephoneQuery.params, { afterFrom: true }, 'telephones').query;
        const addressQuery = db_1.db.read.columns(['contactAddresses.contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type'])
            .tables('ContactAddresses').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactAddresses.contactId']).where('ContactAddresses.contactId', '=', contactId).query;
        const addressesQuery = db_1.db.read.columns('array_to_json(array_agg(addresses)) addresses').subquery(addressQuery.query, addressQuery.params, { afterFrom: true }, 'addresses').query;
        const noteQuery = db_1.db.read.columns(['ContactNotes.contactId, noteId, content'])
            .tables('ContactNotes').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactNotes.contactId']).where('ContactNotes.contactId', '=', contactId).query;
        const notesQuery = db_1.db.read.columns('array_to_json(array_agg(notes)) notes').subquery(noteQuery.query, noteQuery.params, { afterFrom: true }, 'notes').query;
        const emailAddressQuery = db_1.db.read.columns(['ContactEmailAddresses.contactId, emailAddressId, email'])
            .tables('ContactEmailAddresses').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactEmailAddresses.contactId']).where('ContactEmailAddresses.contactId', '=', contactId).query;
        const emailAddressesQuery = db_1.db.read.columns('array_to_json(array_agg(emailAddresses)) emailAddresses').subquery(emailAddressQuery.query, emailAddressQuery.params, { afterFrom: true }, 'emailAddresses').query;
        const websiteQuery = db_1.db.read.columns(['ContactWebsites.contactId, websiteId, websiteName'])
            .tables('ContactWebsites').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactWebsites.contactId']).where('ContactWebsites.contactId', '=', contactId).query;
        const websitesQuery = db_1.db.read.columns('array_to_json(array_agg(websites)) websites').subquery(websiteQuery.query, websiteQuery.params, { afterFrom: true }, 'websites').query;
        const socialQuery = db_1.db.read.columns(['ContactSocials.contactId, socialId, whatsapp, facebook, twitter, snapchat'])
            .tables('ContactSocials').join('INNER JOIN', 'Contacts', ['Contacts.contactId', 'ContactSocials.contactId']).where('ContactSocials.contactId', '=', contactId).query;
        const socialsQuery = db_1.db.read.columns('array_to_json(array_agg(socials)) socials').subquery(socialQuery.query, socialQuery.params, { afterFrom: true }, 'socials').query;
        const labelQuery = db_1.db.read.columns(['ContactLabels.contactId, ContactLabels.labelId, labelName'])
            .tables('ContactLabels').join('INNER JOIN', 'Labels', ['Labels.labelId', 'ContactLabels.labelId']).where('Labels.userId', '=', userId).where('ContactLabels.contactId', '=', contactId).query;
        const labelsQuery = db_1.db.read.columns('array_to_json(array_agg(labels)) labels').subquery(labelQuery.query, labelQuery.params, { afterFrom: true }, 'labels').query;
        const fullQuery = db_1.db.read.columns('*').subquery(telephonesQuery.query, telephonesQuery.params, { inColumn: true })
            .subquery(addressesQuery.query, addressesQuery.params, { inColumn: true })
            .subquery(notesQuery.query, notesQuery.params, { inColumn: true })
            .subquery(emailAddressesQuery.query, emailAddressesQuery.params, { inColumn: true })
            .subquery(websitesQuery.query, websitesQuery.params, { inColumn: true })
            .subquery(socialsQuery.query, socialsQuery.params, { inColumn: true })
            .subquery(labelsQuery.query, labelsQuery.params, { inColumn: true })
            .tables('Contacts').where('Contacts.userId', '=', userId).where('Contacts.contactId', '=', contactId);
        return fullQuery;
    }
    // returns a specific contact which includes telephones, addresses, notes, emailAddresses, websites, socials and labels of a specific user using userId and contactId
    static getContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* const queryString = `select row_to_json(contact, true) as contact
                from ( select *,
                 ( select array_to_json(array_agg(telephones), true) as telephones from ( select contactTelephones.contactId, telephoneId, number, countrycode, contactTelephones.createdAt, contactTelephones.modifiedAt from contacttelephones inner join contacts on contacts.contactid = contacttelephones.contactid where contacttelephones.contactid = $1 ) telephones ),
                
                ( select array_to_json(array_agg(addresses), true) as addresses from ( select contactAddresses.contactId, addressId, country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, ContactAddresses.createdAt, ContactAddresses.modifiedAt from ContactAddresses inner join Contacts on Contacts.contactId = ContactAddresses.contactId where ContactAddresses.contactId = $2 ) addresses ),
                
                ( select array_to_json(array_agg(notes), true) as notes from ( select ContactNotes.contactId, noteId, content, ContactNotes.createdAt, ContactNotes.modifiedAt from ContactNotes INNER JOIN Contacts ON Contacts.contactId = ContactNotes.contactId WHERE ContactNotes.contactId = $3 ) notes ),
                
                ( SELECT array_to_json( array_agg(emailAddresses), true ) as emailAddresses FROM ( SELECT ContactEmailAddresses.contactId, emailAddressId, email, ContactEmailAddresses.createdAt, ContactEmailAddresses.modifiedAt FROM ContactEmailAddresses INNER JOIN Contacts on Contacts.contactId = ContactEmailAddresses.contactId WHERE ContactEmailAddresses.contactId = $4 ) emailAddresses ),
                
                ( SELECT array_to_json( array_agg(websites), true ) as websites FROM ( SELECT ContactWebsites.contactId, websiteId, websiteName, ContactWebsites.createdAt, ContactWebsites.modifiedAt FROM ContactWebsites INNER JOIN Contacts ON Contacts.contactId = ContactWebsites.contactId WHERE ContactWebsites.contactId = $5 ) websites ),
                
                ( SELECT array_to_json( array_agg(socials), true ) as socials FROM ( SELECT ContactSocials.contactId, socialId, whatsapp, facebook, twitter, snapchat FROM ContactSocials INNER JOIN Contacts ON Contacts.contactId = ContactSocials.contactId WHERE ContactSocials.contactId = $6 ) socials ),
                
                ( SELECT array_to_json( array_agg(labels), true ) as labels FROM ( SELECT ContactLabels.contactId, ContactLabels.labelId, labelName, createdAt, modifiedAt FROM ContactLabels INNER JOIN Labels ON Labels.labelId = ContactLabels.labelId WHERE ContactLabels.contactId = $7 AND Labels.userId = $8 ) labels )
                
                FROM Contacts WHERE Contacts.userId = $9 AND Contacts.contactId = $10  ) contact`; */
                /* const telephoneQuery = db.read.columns(['contactTelephones.contactId', 'telephoneId', 'number', 'countrycode', 'contactTelephones.createdAt', 'contactTelephones.modifiedAt'])
                                        .tables('ContactTelephones').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactTelephones.contactId' ]).where('ContactTelephones.contactId', '=', contactId).query;
                
                const telephonesQuery = db.read.columns('array_to_json(array_agg(telephones)) telephones').subquery(telephoneQuery.query, telephoneQuery.params, { afterFrom : true }, 'telephones').query;
    
                const addressQuery = db.read.columns([ 'contactAddresses.contactId', 'addressId', 'country', 'state', 'city', 'streetAddress', 'streetAddressLine2', 'pincode', 'poBox', 'type', 'ContactAddresses.createdAt', 'ContactAddresses.modifiedAt' ])
                                        .tables('ContactAddresses').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactAddresses.contactId' ]).where('ContactAddresses.contactId', '=', contactId).query;
                
                const addressesQuery = db.read.columns('array_to_json(array_agg(addresses)) addresses').subquery(addressQuery.query, addressQuery.params, { afterFrom : true }, 'addresses').query;
    
                const noteQuery = db.read.columns([ 'ContactNotes.contactId', 'noteId', 'content', 'ContactNotes.createdAt', 'ContactNotes.modifiedAt' ])
                                    .tables('ContactNotes').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactNotes.contactId' ]).where('ContactNotes.contactId', '=', contactId).query;
    
                const notesQuery = db.read.columns('array_to_json(array_agg(notes)) notes').subquery(noteQuery.query, noteQuery.params, { afterFrom : true }, 'notes').query;
                
                const emailAddressQuery = db.read.columns([ 'ContactEmailAddresses.contactId', 'emailAddressId', 'email', 'ContactEmailAddresses.createdAt', 'ContactEmailAddresses.modifiedAt' ])
                                            .tables('ContactEmailAddresses').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactEmailAddresses.contactId' ]).where('ContactEmailAddresses.contactId', '=', contactId).query;
                
                const emailAddressesQuery = db.read.columns('array_to_json(array_agg(emailAddresses)) emailAddresses').subquery(emailAddressQuery.query, emailAddressQuery.params, { afterFrom : true }, 'emailAddresses').query;
                
                const websiteQuery = db.read.columns([ 'ContactWebsites.contactId', 'websiteId', 'websiteName', 'ContactWebsites.createdAt', 'ContactWebsites.modifiedAt' ])
                                        .tables('ContactWebsites').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactWebsites.contactId' ]).where('ContactWebsites.contactId', '=', contactId).query;
                            
                const websitesQuery = db.read.columns('array_to_json(array_agg(websites)) websites').subquery(websiteQuery.query, websiteQuery.params, { afterFrom : true }, 'websites').query;
    
                const socialQuery = db.read.columns([ 'ContactSocials.contactId', 'socialId', 'whatsapp', 'facebook', 'twitter', 'snapchat' ])
                                        .tables('ContactSocials').join('INNER JOIN', 'Contacts', [ 'Contacts.contactId', 'ContactSocials.contactId' ]).where('ContactSocials.contactId', '=',contactId).query;
    
                const socialsQuery = db.read.columns('array_to_json(array_agg(socials)) socials').subquery(socialQuery.query, socialQuery.params, { afterFrom : true }, 'socials').query;
                
                const labelQuery = db.read.columns([ 'ContactLabels.contactId', 'ContactLabels.labelId', 'labelName', 'Labels.createdAt', 'Labels.modifiedAt' ])
                                    .tables('ContactLabels').join('INNER JOIN', 'Labels', [ 'Labels.labelId', 'ContactLabels.labelId' ]).where('Labels.userId', '=', userId).where('ContactLabels.contactId', '=', contactId).query;
    
                const labelsQuery = db.read.columns('array_to_json(array_agg(labels)) labels').subquery(labelQuery.query, labelQuery.params, { afterFrom : true }, 'labels').query;
    
                const fullQuery = await db.read.columns('*').subquery(telephonesQuery.query, telephonesQuery.params,{ inColumn : true })
                                    .subquery(addressesQuery.query, addressesQuery.params, { inColumn : true })
                                    .subquery(notesQuery.query, notesQuery.params, { inColumn : true })
                                    .subquery(emailAddressesQuery.query, emailAddressesQuery.params, { inColumn : true })
                                    .subquery(websitesQuery.query, websitesQuery.params, { inColumn : true })
                                    .subquery(socialsQuery.query, socialsQuery.params, { inColumn : true })
                                    .subquery(labelsQuery.query, labelsQuery.params, { inColumn : true })
                                    .tables('Contacts').where('Contacts.userId', '=', userId).where('Contacts.contactId', '=', contactId).get();
    
                return fullQuery.rows; */
                //const contactDetail = await pool.query(queryString, [contactId, contactId, contactId, contactId, contactId, contactId, contactId, userId, userId, contactId]);
                return (yield Contact.getQuery(userId, contactId).get()).rows;
                //return contactDetail.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create a new contact
    static createContact(newContact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newContact: contact, contactTelephones: telephones, contactAddresses: addresses, contactEmailAddresses: emailAddresses, contactNotes: notes, contactSocials: socials, contactWebsites: websites, contactLabels } = newContact;
                /*const contactQueryString = `INSERT INTO Contacts(userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department)
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
                  FROM json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}')`; */
                const contactSelect = db_1.db.read.columns(['userId', 'contactId', 'contactPhoto', 'prefix', 'firstName', 'middleName', 'lastName', 'suffix', 'phoneticFirst', 'phoneticMiddle', 'phoneticLast', 'nickname', 'fileAs', 'dateOfBirth', 'relationship', 'chat', 'internetCall', 'customField', 'event', 'company', 'jobTitle', 'department'])
                    .tables(`json_populate_record(null::Contacts, '${JSON.stringify(contact)}')`).query;
                const contactResult = yield db_1.db.write.table('Contacts').columns(['userId', 'contactId', 'contactPhoto', 'prefix', 'firstName', 'middleName', 'lastName', 'suffix', 'phoneticFirst', 'phoneticMiddle', 'phoneticLast', 'nickname', 'fileAs', 'dateOfBirth', 'relationship', 'chat', 'internetCall', 'customField', 'event', 'company', 'jobTitle', 'department'])
                    .subquery(contactSelect.query, contactSelect.params, { afterColumn: true }).execute();
                const telephonesSelect = db_1.db.read.columns(['contactId', 'telephoneId', 'countryCode', 'number'])
                    .tables(`json_populate_recordset(null::ContactTelephones, '${JSON.stringify(telephones)}')`).query;
                const telephonesResult = db_1.db.write.table('ContactTelephones').columns(['contactId', 'telephoneId', 'countryCode', 'number'])
                    .subquery(telephonesSelect.query, telephonesSelect.params, { afterColumn: true }).execute();
                const addressesSelect = db_1.db.read.columns(['contactId', 'addressId', 'country', 'state', 'city', 'streetAddress', 'streetAddressLine2', 'pincode', 'poBox', 'type'])
                    .tables(`json_populate_recordset(null::ContactAddresses, '${JSON.stringify(addresses)}')`).query;
                const addressesResult = db_1.db.write.table('ContactAddresses').columns(['contactId', 'addressId', 'country', 'state', 'city', 'streetAddress', 'streetAddressLine2', 'pincode', 'poBox', 'type'])
                    .subquery(addressesSelect.query, addressesSelect.params, { afterColumn: true }).execute();
                const emailAddressesSelect = db_1.db.read.columns(['contactId', 'emailAddressId', 'email'])
                    .tables(`json_populate_recordset(null::ContactEmailAddresses, '${JSON.stringify(emailAddresses)}')`).query;
                const emailAddressesResult = db_1.db.write.table('ContactEmailAddresses').columns(['contactId', 'emailAddressId', 'email'])
                    .subquery(emailAddressesSelect.query, emailAddressesSelect.params, { afterColumn: true }).execute();
                const notesSelect = db_1.db.read.columns(['contactId', 'noteId', 'content'])
                    .tables(`json_populate_recordset(null::ContactNotes, '${JSON.stringify(notes)}')`).query;
                const notesResult = db_1.db.write.table('ContactNotes').columns(['contactId', 'noteId', 'content'])
                    .subquery(notesSelect.query, notesSelect.params, { afterColumn: true }).execute();
                const socialsSelect = db_1.db.read.columns(['contactId', 'socialId', 'whatsapp', 'facebook', 'twitter', 'snapchat'])
                    .tables(`json_populate_recordset(null::ContactSocials, '${JSON.stringify(socials)}')`).query;
                const socialsResult = db_1.db.write.table('ContactSocials').columns(['contactId', 'socialId', 'whatsapp', 'facebook', 'twitter', 'snapchat'])
                    .subquery(socialsSelect.query, contactSelect.params, { afterColumn: true }).execute();
                const websitesSelect = db_1.db.read.columns(['contactId', 'websiteId', 'websiteName'])
                    .tables(`json_populate_recordset(null::ContactWebsites, '${JSON.stringify(websites)}')`).query;
                const websitesResult = db_1.db.write.table('ContactWebsites').columns(['contactId', 'websiteId', 'websiteName'])
                    .subquery(websitesSelect.query, websitesSelect.params, { afterColumn: true }).execute();
                const contactLabelsSelect = db_1.db.read.columns(['contactId', 'labelId'])
                    .tables(`json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}')`).query;
                const contactLabelsResult = db_1.db.write.table('ContactLabels').columns(['contactId', 'labelId'])
                    .subquery(contactLabelsSelect.query, contactLabelsSelect.params, { afterColumn: true }).execute();
                /* const telephonesResult = await pool.query(telephonesQueryString);
                const addressesResult = await pool.query(addressesQueryString);
                const emailAddressesResult = await pool.query(emailAddressesQueryString);
                const notesResult = await pool.query(notesQueryString);
                const socialsResult = await pool.query(socialsQueryString);
                const websitesResult = await pool.query(websitesQueryString);
                const contactLabelsResult = await pool.query(contactLabelsQueryString); */
                return Promise.all([telephonesResult, addressesResult, emailAddressesResult, notesResult, socialsResult, websitesResult, contactLabelsResult]).then(res => [contactResult, ...res]);
                //return { contactResult, telephonesResult, addressesResult, emailAddressesResult, notesResult, socialsResult, websitesResult, contactLabelsResult };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update an existing contact
    static updateContact(userId, contactId, updatedContact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newContact: contact, contactTelephones: telephones, contactAddresses: addresses, contactEmailAddresses: emailAddresses, contactNotes: notes, contactSocials: socials, contactWebsites: websites, contactLabels } = updatedContact;
                /* const isContactAvailable = (await db.read.columns('contactId').tables('Contacts').where('userId', '=', userId).where('contactId', '=', contactId).get()).rowCount;
                if(!isContactAvailable) {
                    return new Error('Contact does not belongs to the user');
                } */
                /* const contactQueryString = `UPDATE Contacts SET (contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt) =
                ( SELECT contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt
                FROM json_populate_record(null::Contacts, '${JSON.stringify(contact)}' )
                WHERE contactid = $1)
                WHERE Contacts.contactId = $2 AND Contacts.userId = $3`;
                
                const contactResult = await pool.query(contactQueryString, [contactId, contactId, userId]); */
                const contactSelect = db_1.db.read.columns('contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt')
                    .tables(`json_populate_record(null::Contacts, '${JSON.stringify(contact)}')`)
                    .where('contactid', '=', contactId)
                    .query;
                const contactResult = db_1.db.update.table('Contacts').columns('contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, company, jobTitle, department, modifiedAt')
                    .subquery(contactSelect.query, contactSelect.params, { afterColumn: true })
                    .where('Contacts.contactId', '=', contactId)
                    .where('Contacts.userId', '=', userId).execute();
                let telephonesResult = [];
                let total = telephones.length;
                for (let i = 0; i < total; i++) {
                    const telephone = telephones[i];
                    /* const telephoneQueryString = `UPDATE ContactTelephones SET (countryCode, number, modifiedAt) =
                    ( SELECT countryCode, number, modifiedAt
                    FROM json_populate_record(null::ContactTelephones, '${JSON.stringify(telephone)}')
                    WHERE telephoneid = $1)
                    WHERE ContactTelephones.contactId = $2 AND ContactTelephones.telephoneId = $3`;
                    const telephoneResult = await pool.query(telephoneQueryString, [telephone.telephoneid, contactId, telephone.telephoneid]); */
                    const telephoneSelect = db_1.db.read.columns(['countryCode', 'number', 'modifiedAt'])
                        .tables(`json_populate_record(null::ContactTelephones, '${JSON.stringify(telephone)}')`)
                        .where('telephoneid', '=', telephone.telephoneid).query;
                    const telephoneResult = db_1.db.update.table('ContactTelephones').columns(['countryCode', 'number', 'modifiedAt'])
                        .subquery(telephoneSelect.query, telephoneSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('telephoneId', '=', telephone.telephoneid)
                        .execute();
                    telephonesResult.push(telephoneResult);
                }
                let addressesResult = [];
                total = addresses.length;
                for (let i = 0; i < total; i++) {
                    const address = addresses[i];
                    /* const addressQueryString = `UPDATE ContactAddresses SET (country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, modifiedAt) =
                    ( SELECT country, state, city, streetAddress, streetAddressLine2, pincode, poBox, type, modifiedAt
                    FROM json_populate_record(null::ContactAddresses, '${JSON.stringify(address)}')
                    WHERE addressid = $1)
                    WHERE ContactAddresses.contactId = $2 AND ContactAddresses.addressId = $3`;
                    const addressResult = await pool.query(addressQueryString, [ address.addressid, contactId, address.addressid ]); */
                    const addressSelect = db_1.db.read.columns(['country', 'state', 'city', 'streetAddress', 'streetAddressLine2', 'pincode', 'poBox', 'type', 'modifiedAt'])
                        .tables(`json_populate_record(null::ContactAddresses, '${JSON.stringify(address)}')`)
                        .where('addressid', '=', address.addressid).query;
                    const addressResult = db_1.db.update.table('ContactAddresses').columns(['country', 'state', 'city', 'streetAddress', 'streetAddressLine2', 'pincode', 'poBox', 'type', 'modifiedAt'])
                        .subquery(addressSelect.query, addressSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('addressId', '=', address.addressid)
                        .execute();
                    addressesResult.push(addressResult);
                }
                let emailAddressesResult = [];
                total = emailAddresses.length;
                for (let i = 0; i < total; i++) {
                    const emailAddress = emailAddresses[i];
                    /*  const emailAddressQueryString = `UPDATE ContactEmailAddresses SET (email, modifiedAt) =
                    ( SELECT email, modifiedAt
                    FROM json_populate_record(null::ContactEmailAddresses, '${JSON.stringify(emailAddress)}')
                    WHERE emailaddressid = $1)
                    WHERE ContactEmailAddresses.contactId = $2 AND ContactEmailAddresses.emailAddressId = $3`;
                    const emailAddressResult = await pool.query(emailAddressQueryString, [emailAddress.emailaddressid, contactId, emailAddress.emailaddressid]); */
                    const emailAddressSelect = db_1.db.read.columns(['email', 'modifiedAt'])
                        .tables(`json_populate_record(null::ContactEmailAddresses, '${JSON.stringify(emailAddress)}')`)
                        .where('emailaddressid', '=', emailAddress.emailaddressid)
                        .query;
                    const emailAddressResult = db_1.db.update.table('ContactEmailAddresses').columns(['email', 'modifiedAt'])
                        .subquery(emailAddressSelect.query, emailAddressSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('emailAddressId', '=', emailAddress.emailaddressid)
                        .execute();
                    emailAddressesResult.push(emailAddressResult);
                }
                let notesResult = [];
                total = notes.length;
                for (let i = 0; i < total; i++) {
                    const note = notes[i];
                    /*  const noteQueryString = `UPDATE ContactNotes SET (content, modifiedAt) =
                    ( SELECT content, modifiedAt
                    FROM json_populate_record(null::ContactNotes, '${JSON.stringify(note)}')
                    WHERE noteid = $1 )
                    WHERE ContactNotes.contactId = $2 AND ContactNotes.noteId = $3`;
                    const noteResult = await pool.query(noteQueryString, [ note.noteid, contactId, note.noteid ]); */
                    const noteSelect = db_1.db.read.columns(['content', 'modifiedAt'])
                        .tables(`json_populate_record(null::ContactNotes, '${JSON.stringify(note)}')`)
                        .where('noteid', '=', note.noteid)
                        .query;
                    const noteResult = db_1.db.update.table('ContactNotes').columns(['content', 'modifiedAt'])
                        .subquery(noteSelect.query, noteSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('noteId', '=', note.noteid)
                        .execute();
                    notesResult.push(noteResult);
                }
                let socialsResult = [];
                total = socials.length;
                for (let i = 0; i < total; i++) {
                    const social = socials[i];
                    /* const socialQueryString = `UPDATE ContactSocials SET (whatsapp, facebook, twitter, snapchat) =
                    ( SELECT whatsapp, facebook, twitter, snapchat
                    FROM json_populate_record(null::ContactSocials, '${JSON.stringify(social)}')
                    WHERE socialid = $1 )
                    WHERE ContactSocials.contactId = $2 AND ContactSocials.socialId = $3`;
                    const socialResult = await pool.query(socialQueryString, [ social.socialid, contactId, social.socialid ]); */
                    const socialSelect = db_1.db.read.columns('whatsapp, facebook, twitter, snapchat').tables(`json_populate_record(null::ContactSocials, '${JSON.stringify(social)}')`).where('socialid', '=', social.socialid).query;
                    const socialResult = db_1.db.update.table('ContactSocials')
                        .columns('whatsapp, facebook, twitter, snapchat')
                        .subquery(socialSelect.query, socialSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('socialId', '=', social.socialid)
                        .execute();
                    socialsResult.push(socialResult);
                }
                let websitesResult = [];
                total = websites.length;
                for (let i = 0; i < total; i++) {
                    const website = websites[i];
                    /* const websiteQueryString = `UPDATE ContactWebsites SET (websiteName, modifiedAt) =
                    ( SELECT websiteName, modifiedAt
                    FROM json_populate_record(null::ContactWebsites, '${JSON.stringify(website)}')
                    WHERE websiteid = $1 )
                    WHERE ContactWebsites.contactId = $2 AND ContactWebsites.websiteId = $3`;
                    const websiteResult = await pool.query(websiteQueryString, [ website.websiteid, contactId, website.websiteid ]); */
                    const websiteSelect = db_1.db.read.columns('websiteName, modifiedAt')
                        .tables(`json_populate_record(null::ContactWebsites, '${JSON.stringify(website)}')`)
                        .where('websiteid', '=', website.websiteid)
                        .query;
                    const websiteResult = db_1.db.update.table('ContactWebsites')
                        .columns('websiteName, modifiedAt')
                        .subquery(websiteSelect.query, websiteSelect.params, { afterColumn: true })
                        .where('contactId', '=', contactId)
                        .where('websiteId', '=', website.websiteid)
                        .execute();
                    websitesResult.push(websiteResult);
                }
                let contactLabelsResult = {};
                if (contactLabels.length) {
                    const removeContactLabelResult = yield db_1.db.delete.table('ContactLabels').where('contactId', '=', contactId).delete();
                    /*const contactLabelsQueryString = `INSERT INTO ContactLabels(contactId, labelId)
                    ( SELECT contactId, labelId FROM json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}') )`;
                    contactLabelsResult = await pool.query(contactLabelsQueryString); */
                    const contactLabelsSelect = db_1.db.read.columns(' contactId, labelId ')
                        .tables(`json_populate_recordset(null::ContactLabels, '${JSON.stringify(contactLabels)}') `)
                        .query;
                    contactLabelsResult = db_1.db.write.table('ContactLabels')
                        .columns('contactId, labelId')
                        .subquery(contactLabelsSelect.query, contactLabelsSelect.params, { afterColumn: true })
                        .execute();
                }
                // return contactLabelsResult;
                return Promise.all([contactResult, ...telephonesResult, ...addressesResult, ...emailAddressesResult, ...notesResult, ...socialsResult, ...websitesResult, contactLabelsResult]);
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