var chai = require('chai');
var expect = chai.expect;
var jsonexport = require('../lib/index');

describe('Array', () => {
    it('simple', () => {
        jsonexport([{
            name: 'Bob',
            lastname: 'Smith'
        },{
            name: 'James',
            lastname: 'David'
        }], {}, (err, csv) => {
            expect(csv).to.equal('name,lastname\nBob,Smith\nJames,David');
        });
    });
    it('complex', () => {
        jsonexport([{
           name: 'Bob',
           lastname: 'Smith',
           family: {
               name: 'Peter',
               type: 'Father'
           }
        },{
           name: 'James',
           lastname: 'David',
           family:{
               name: 'Julie',
               type: 'Mother'
           }
        }], {}, (err, csv) => {
            expect(csv).to.equal('name,lastname,family.name,family.type\nBob,Smith,Peter,Father\nJames,David,Julie,Mother');
        });
    });
    it('escapes', () => {
        jsonexport([{
            string_1: 'has several, characters, "it needs" to escape;'
        },
        {
            string_2: 'even more, characters, "it needs" to escape;'
        }], {}, (err, csv) => {
            expect(csv).to.equal('string_1,string_2\n"has several, characters, ""it needs"" to escape;",\n,"even more, characters, ""it needs"" to escape;"');
        })
    });
});
