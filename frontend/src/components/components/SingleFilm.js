import React from 'react'
import moment from 'moment'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'


class SingleFilm extends React.Component {
  constructor() {
    super()
    this.state = {
      film: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/watch/${id}`)
      .then(response => {
        this.setState({ film: response.data })
      })
  }

  HandleState(e) {
    this.setState({ comment: e.target.value })
  }

  HandleCommentSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    let rating = 0
    const stars = Array.from(e.target.previousSibling.lastChild.childNodes)

    stars.map(el => {
      el.style.color === 'gold' ? rating = rating + 1 : null
    })

    stars.map(el => {
      el.style.color = 'white'
    })

    const reqBody = {
      text: e.target.firstChild.value,
      rating: rating
    }

    axios.post(`/api/watch/${id}/comments`,
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''

    setTimeout(() => {
      axios.get(`/api/watch/${id}`)
        .then(response => {
          this.setState({ film: response.data })
          // console.log(response.data)
        })
    }, 1000)

  }

  HandleStar(e) {
    const style = e.target.style
    style.color = 'gold'
  }



  render() {
    // console.log(this.state.comment)
    const { film } = this.state
    const starStyle = {
      color: 'white',
      animation: 'none',
      fontSize: '19.5px',
      opacity: '0.85',
      transform: 'translate(0, 6px)'
    }

    return (
      <main className='single-film'>
        <div className="single-film-container">

          <div className="single-film-left">
            <div className="single-film-title">
              <h1> {film.title} </h1>
              <h3>{film.description}</h3>
              <p> Certificate: {film.certification} <span> Director: {film.director} </span> Duration: {film.duration} </p>
            </div>

            <div className="single-film-media">
              <img src={film.image} alt="" />
              <video style={{ opacity: '0.9' }} controls onClick={e => e.target.play()} src={film.trailer + '#t=10'} />

            </div>
          </div>

          <div className="film-right">
            <div className="film-comments">
              <h3> {film.comments ? film.comments.length : '0'} COMMENTS</h3>
              <div className="previous-film-comments">
                {
                  film.comments ?
                    film.comments.map(comment => {
                      return (
                        <div key={comment._id} className="film-comment-row">
                          <section>
                            <h3> {comment.user} </h3>
                            <h5 className='rating'> Rating: {comment.rating} </h5>
                            <ion-icon style={{ color: 'gold', fontSize: '17px', animation: 'none', transform: 'translate(0, -2px)'}} name="star-sharp"></ion-icon> 
                          </section>
                          <p> {comment.text} </p>
                          <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                        </div>
                      )
                    }) : null}
              </div>

              <div className="film-user-comment">

                <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h4>
                  <div className="star-icons" style={{ transform: 'translate(-85px, -11.7px)' }}>
                    <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                  </div>
                </div>

                {!auth.isLoggedIn() ? null :
                  <form onSubmit={(e) => this.HandleCommentSubmit(e)} onChange={(e) => this.HandleState(e)} style={{ width: '100%' }} action="">
                    <input placeholder='Write here...'></input>
                    <button style={{ marginBottom: '1px' }}> POST </button>
                  </form>
                }


              </div>
            </div>


          </div>


        </div>
      </main>

    )
  }
}

export default SingleFilm
