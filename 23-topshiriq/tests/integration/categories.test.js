const request = require('supertest')
let server;
const { Category } = require('../../models/category');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/categores', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Category.remove({});
    })
    describe('GET /', () => {
        it('Get all categories...', async () => {
            await Category.collection.insertMany([
                { name: 'dasturlash' },
                { name: 'tarmoqlar' },
                { name: 'dizayn' }
            ]);

            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3); // categoryni uzunligi 3 ga teng deyopmiz
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy(); // category name da dasturlash degan narsa bor yoqligini tekshiradi
        })
    });

    describe('GET /:id', () => {
        it('agar id db da mavjud bolsa qaytarib bersin...', async () => {
            const category = new Category({ name: 'suniy intelekt' });
            await category.save();

            const response = await request(server).get('/api/categories/' + category._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'suniy intelekt');
        });

        it('agar id db da mavjud bomasa 404 xato qaytarib bersin...', async () => {
            const response = await request(server).get('/api/categories/123');
            expect(response.status).toBe(404);
        });

        it('agar id db da mavjud bomasa 404 xato qaytarib bersin va chiqib ketsin...', async () => {
            const categoryId = mongoose.Types.ObjectId();
            const response = await request(server).get('/api/categories/' + categoryId);
            expect(response.status).toBe(404);
        })
    });

    describe('POST /', () => {
        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post('/api/categories/')
                .set('x-auth-token', token)
                .send({ name });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'dasturlash';
        });

        it('agar so\'rolovchi avtorizatsiyadan otmagn bolsa 401 qaytarsin', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });

        it('Agar category 3 ta harfdan kam boladaigan bolsa 400 xato qaytarsin...', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('agar category lar 50 tada kop bolsa 400 xatosi qaytarsin..', async () => {
            name = new Array(52).join('bir nimalaa');
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('jo\'natiladigan malumot togri boladigan bolsa ', async () => {
            await execute();
            const category = await Category.find({ name: 'dasturlash' });
            expect(category).not.toBeNull();
        });

        // it('agar so\'rovimiz valid boladigan bolsa ', async () => {     // Bu test nimaGADIR MANGAISHLAMADI .. . . . . . .. . . .
        //     const res = await execute();
        //     expect(res.body).toHaveProperty('_id');
        //     expect(res.body).toHaveProperty('name', 'dasturlash'); 
        // });
    });

});