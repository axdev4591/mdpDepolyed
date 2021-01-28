import './style.css'

const Widget = (props) => {

    return ( <div className="widgets">


            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAxel4591&
                        tabs=timeline&width=240&height=1500&small_header=false&
                        adapt_container_width=true&show_facepile=true&appId=415542422979549"
                    width="240" 
                    height="100%"
                    style={{border:"none", overflow: "hidden"}} 
                    frameBorder="0"
                    allowtransparency="true"
                    scrolling="no"
                    allow="encrypted-media"></iframe>
          
        </div>)
}

export default Widget