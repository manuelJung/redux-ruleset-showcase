import * as React from 'react'
import styled from 'styled-components'
import LinkList from '../components/LinkList'
import UserList from '../components/UserList'
import {addRule, removeRule} from 'redux-ruleset'
import * as users from '../modules/users'
import Code from '../components/Code'

export default function UrlHydrationRoute () {
  const [mount, setMount] = React.useState(false)
  useRules()
  React.useEffect(() => {
    setTimeout(() => setMount(true), 100)
  },[])
  return (
    <Wrapper>
      <h1>Url Hydration</h1>

      <p>
        In the last section we learned how we can mutate actions. But the 
        example was pretty useless (but simple). Now we I want to to show 
        a real world use-case where action mutations can be used:
      </p>

      <p>
        It is a common feature for filterable lists, that the current filters
        are reflected in the url. That way a user can bookmark or share his filtered
        list. We will write two rules. One for updating the url and one for 
        the hydration. First the update logic:
      </p>

      <Code trim={6} content={`
        /**
         * When we successfully fetched products
         * Then we add the corresponding filters as a
         *  hash to the url
         */
        addRule({
          id: 'feature/UPDATE_URL',
          target: 'users/FETCH_SUCCESS',
          output: '#url-hash',
          consequence: (_, {getState}) => {
            const state = getState()
            const {pathname} = = window.location
            const filters = state.users.filters
            const hash = \`#num-hits=\${filters.numHits}&gender=\${filters.gender}\`
            window.history.replaceState(null,null,pathname + hash)
          }
        })
      `}/>

      <p>
        Whenever we update our new products we add the filters to the url.
        Try it out:
      </p>

      {mount && <UserList />}

      <p>
        Now we need a rule for hydrating this state. Whenever we create our user
        list, we initially dispatch the action <b>users/INIT</b>. We can mutate
        this action and override it with the filters in our url:
      </p>

      <Code trim={6} content={`
        /**
         * When we init out user module
         * and the url hash includes filters
         * Then we init our user module by the hash filters
         */
        addRule({
          id: 'feature/HYDRATE_FROM_URL',
          target: 'users/INIT',
          output: 'users/INIT',
          position: 'INSTEAD',
          condition: () => window.location.hash.includes('num-hits='),
          consequence: () => {
            const {hash} = window.location
            const numHits = hash.match(/num-hits=(.*)&/)[1]
            const gender = hash.match(/gender=(.*)/)[1]
            return users.init({numHits, gender})
          }
        })
      `}/>

      <p>
        Reload this page. you can see, that our user filters were hydrated
        correctly. Open the devtools and look, how this is reflected.
      </p>

      <p>
        Did you noticed what happened? We were able to implement a quite 
        complex feature without the need to touch our user module or any
        react component. The rest of our application does not even know
        that we can hydrate filters from the url. 
      </p>

      <p>
        Each rule is like a little program within your application that can
        extend, cancel or mutate your dataflow in an isolated way. Your
        application will never increase in complexity. And with the devtools
        you can see the relations how each rule can affect your data-flow.
      </p>

      <LinkList
        prev={['/mutation', 'Action Mutations']}
        next={['/sagas', 'Sagas']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`


function useRules () {
  React.useEffect(() => {
    /**
     * When we successfully fetched products
     * Then we add the corresponding filters as a
     *  hash to the url
     */
    const updateRule = addRule({
      id: 'feature/UPDATE_URL',
      target: users.FETCH_SUCCESS,
      output: '#url-hash',
      consequence: (_, {getState}) => {
        const state = getState()
        const filters = state.users.filters
        const hash = `#num-hits=${filters.numHits}&gender=${filters.gender}`
        window.history.replaceState(null,null,window.location.pathname + hash)
      }
    })
    /**
     * When we init out user module
     * and the url hash includes filters
     * Then we init our user module by the hash filters
     */
    const hydrateRule = addRule({
      id: 'feature/HYDRATE_FROM_URL',
      target: users.INIT,
      output: users.INIT,
      position: 'INSTEAD',
      condition: () => window.location.hash.includes('num-hits='),
      consequence: () => {
        const {hash} = window.location
        const numHits = hash.match(/num-hits=(.*)&/)[1]
        const gender = hash.match(/gender=(.*)/)[1]
        return users.init({numHits, gender})
      }
    })
    return () => {
      removeRule(updateRule)
      removeRule(hydrateRule)
    }
  }, [])
}