import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {

    await prisma.user.createMany({
        data: Array.from({ length: 10 }).map(() => ({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "1234",
            role: faker.helpers.arrayElement(['admin', 'user']),
        })),
    });

    await prisma.establishment.createMany({
        data: Array.from({ length: 5 }).map(() => ({
            name: faker.company.name(),
            address: faker.address.streetAddress(),
        })),
    });

    const createdEstablishments = await prisma.establishment.findMany();

    for (const establishment of createdEstablishments) {
        await prisma.product.createMany({
            data: Array.from({ length: 4 }).map(() => ({
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price({
                    max: 40,
                    min: 1
                })),
                description: faker.commerce.productDescription(),
                establishmentId: establishment.id,
            })),
        });
    }

    const createdUsers = await prisma.user.findMany();
    const createdProducts = await prisma.product.findMany();

    for (const user of createdUsers) {
        const randomProduct = faker.helpers.arrayElement(createdProducts);
        await prisma.order.create({
            data: {
                userId: user.id,
                productId: randomProduct.id,
                status: faker.helpers.arrayElement(['Pending', 'Completed', 'Canceled']),
                qrCode: faker.string.uuid(),
                orderDateTime: faker.date.anytime()
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
