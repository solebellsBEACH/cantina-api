import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const imageList = [
    'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/aironcom/catalog/amendoim/pacocas/pacoca-fundo-branco.jpg',
];

async function main() {
    // Criar usuários
    const usersData = Array.from({ length: 10 }).map(() => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: "1234", // Não recomendado para produção, criptografar senha!
        role: faker.helpers.arrayElement(['admin', 'user']),
    }));
    await prisma.user.createMany({
        data: usersData,
    });

    // Criar categorias
    const categoriesData = ["bebidas", "doces", "salgados"].map(name => ({
        name
    }));
    await prisma.category.createMany({
        data: categoriesData,
    });

    // Criar estabelecimentos
    const establishmentsData = Array.from({ length: 5 }).map(() => ({
        name: faker.company.name(),
        address: faker.address.streetAddress(),
    }));
    await prisma.establishment.createMany({
        data: establishmentsData,
    });

    // Criar produtos para cada estabelecimento
    const createdCategories = await prisma.category.findMany();
    const createdEstablishments = await prisma.establishment.findMany();

    for (const establishment of createdEstablishments) {
        const productsData = Array.from({ length: 4 }).map(() => ({
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price({ max: 40, min: 1 })),
            description: faker.commerce.productDescription(),
            establishmentId: establishment.id,
            categoryId: faker.helpers.arrayElement(createdCategories)?.id || 1,
            image_url: faker.helpers.arrayElement(imageList),
        }));
        await prisma.product.createMany({
            data: productsData,
        });
    }

    // Criar pedidos para cada usuário
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
                orderDateTime: faker.date.anytime(),
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
