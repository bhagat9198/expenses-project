import { Form, useLoaderData } from '@remix-run/react';
import { createClient } from '@supabase/supabase-js'
import { addUser, getUsers } from '~/lib/add.server';

export default function Index() {
  const USERS = useLoaderData();
  console.log('USERS :: ', USERS);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <section>
        <h1 className='text-3xl text-red-600 hello' >Welcome to Remix</h1>
        <Form method='post' >
          <input defaultValue={Math.random()} name="id" />
          <button type='submit' >Create dummy user Submit</button>
        </Form>
      </section>

    </div>
  );
}

export async function loader() {
  const users = await getUsers();
  console.log('users :: ', users);

  return users;
}

export async function action() {
  console.log('action called');

  const users = await addUser();
  console.log('users :: ', users);

  return users;
}
