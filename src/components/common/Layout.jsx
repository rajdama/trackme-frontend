import Navbar from '../Navbar'

const Layout = (props) => {
  return (
    <>
      <div id={`Page-${props.id}`}>
        <Navbar />
        <div id={`Main-${props.id}`}>{props.children}</div>
      </div>
    </>
  )
}

export default Layout
