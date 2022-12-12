import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';

export const prisma = new PrismaClient({
    log: ['query']
})

// async function main(){
//     const password = await hash("admin", 8)

//     await prisma.user.create({
//         data: {
//             name: 'admin',
//             email: 'admin',
//             password,
//             driver_license: 'admin',
//             isAdmin: true,
//             avatar: 'admin'
//         }
//     })
// }

// main()
//     .catch((e) => {
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     })