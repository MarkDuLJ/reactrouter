import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts()
  return {
    contacts
  }
}

export async function action() {
  const contact = await createContact()
  console.log("XXXX", contact);
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts } = useLoaderData()
  console.log(contacts);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div >
          <form id="search-form" role="search">
            <input
              type="search"
              id='q'
              aria-label="Search contacts"
              placeholder="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>)
              )}
            </ul>
          ) : (
            <p><i>No Contacts</i></p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}