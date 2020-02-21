import React from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import bulma from 'bulma'
import Nav from './nav'
import { initStorage } from './storage'
import Web3Provider from 'web3-react'
import { Connectors, useWeb3Context } from 'web3-react'
const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })

const post = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A mene tu? Qui potest igitur habitare in beata vita summi mali metus? Nihil opus est exemplis hoc facere longius. Sint ista Graecorum; Neque enim disputari sine reprehensione nec cum iracundia aut pertinacia recte disputari potest. Duo Reges: constructio interrete. Negare non possum.'
}
const posts = [post, post, post, post, post]

const Posts = props => {
  const posts = props.posts.map((post, index) => (
    <Post key={index} post={post} />
  ))
  return <div>{posts}</div>
}

const Post = props => {
  return (
    <div className='card'>
      <div className='card-content'>
        <div className='content'>{props.post.content}</div>
      </div>
    </div>
  )
}
const Identity = () => {
  return <h1>Identity</h1>
}
const Account = () => {
  const context = useWeb3Context()

  return <p>{context.account}</p>
}

const Activation = () => {
  const context = useWeb3Context()
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])

  if (!context.active && !context.error) {
    // loading
    return <p>Loading</p>
  } else if (context.error) {
    //error
    return <p>Error {context.error}</p>
  } else {
    // success
    return (
      <>
        <h1>Loading sucess</h1>
        {conext => {
          console.log(conext)
          return <p>{conext.account}</p>
        }}
      </>
    )
  }
}

const App = () => {
  initStorage()
  return (
    <Web3Provider connectors={{ MetaMask }} libraryName='ethers.js'>
      <Activation />
      <Account />
      <div className='section'>
        <div className='container'>
          <h1>Foooo</h1>
          <Identity />
          <Posts posts={posts} />
        </div>
      </div>
    </Web3Provider>
  )
}

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
