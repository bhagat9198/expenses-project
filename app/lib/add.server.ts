import { supabase, prisma} from './../config/supabase';


export const getUsers = async() => {
  const users = await prisma.user.findMany();
  console.log('users :: ', users);
  return users;
}

export const addUser = async() => {
  const user = await prisma.user.create({
    data: {
      isAdmin: false,
      name: 'Bhagat',
    }
  })
  console.log('user :: ', user);
  return user;
}

export const endSesssion = async() => {
  const res = await prisma.$disconnect();
  console.log('endSesssion :: res :: ', res);
  return true;
}