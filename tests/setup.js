const { sequelize } = require("../src/db");
const { Country } = require("../src/models/Country");
const { Company } = require("../src/models/Company");
const { Subsidiary } = require("../src/models/Subsidiary");
const { Listing } = require("../src/models/Listing");
const { PlatformListing } = require("../src/models/PlatformListing");

async function insertObjects() {
    await Country.bulkCreate([{
        name: 'Argentina',
        code: 'AR',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Mexico',
        code: 'MX',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'United States of America',
        code: 'US',
        createdAt: new Date(),
        updatedAt: new Date()
    }])

    await Company.bulkCreate([{
        name: 'Company A',
        logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Company B',
        logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Company C',
        logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    }])

    await Subsidiary.bulkCreate([{
        name: 'Subsidiary A',
        logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        countryId: 1,
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Subsidiary B',
        logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        countryId: 2,
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }])

    // Listing
    await Listing.bulkCreate([{
        companyName: 'Company A',
        companyLogo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        name: 'Listing A',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'ACTIVE',
        gs: '',
        subsidiaryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        companyName: 'Company A',
        companyLogo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        name: 'Listing B',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'INACTIVE',
        gs: '',
        subsidiaryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        companyName: 'Company B',
        companyLogo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
        name: 'Listing A',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'INACTIVE',
        gs: '',
        subsidiaryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }])

    await PlatformListing.bulkCreate([{
        listingId: 1,
        state: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        listingId: 2,
        state: 'INACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        listingId: 3,
        state: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
    }])
}

global.beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await insertObjects()
});

global.afterAll(async () => {
    await sequelize.close()
});
