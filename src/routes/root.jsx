import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader({request}) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts = await getContacts(q)
  return {
    contacts,
    q
  }
}

export async function action() {
  const contact = await createContact()
  console.log("XXXX", contact);
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts,q } = useLoaderData()
  console.log(contacts);

  const navigation = useNavigation()
  console.log(navigation.location);
  const submit = useSubmit()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div >
          <Form id="search-form" role="search">
            <input
              type="search"
              id='q'
              className={searching ? "loading" :""}
              aria-label="Search contacts"
              placeholder="search"
              name="q"
              defaultValue={q}
              onChange={(e) => {
                const isFirstSearch =  q==null
                submit(e.currentTarget.form, {
                  // if true to replace the current entry in the browser's history stack instead of creating a new one
                  replace: !isFirstSearch
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
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
      <div 
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
        >
        <Outlet />
      </div>
    </>
  )
}