import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {githubRepos} from '../../actions/profile'
import Spinner from '../layout/Spinner'



const ProfileGithub = ({username, githubRepos,repos}) => {
        /* ya me cargo el estado con los repos */
       useEffect(() => {
          githubRepos(username)
       }, [githubRepos]) 


    return (
        <div className="profile-github">

            <h2 className="text-primary">Repositorios GitHub</h2>
            {repos && repos === null ? (
                <>
                <h1>no hay repos</h1>
                <Spinner />
                </>
                ) : (
                repos.map(repo => (
                    <div key={repo._id} className="repo bg-white p-1 my-1">
                        <div>
                <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                    </a>                    
                    </h4>
                    <p>{repo.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {repo.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Watchers: {repo.stargazers_count}
                            </li>                       
                            <li className="badge badge-light">
                                Forks : {repo.forks_count}
                            </li>
                        </ul>
                    </div>



                    </div>
                ))
            )}

            
        </div>
    )
}

const mapStateToProps = state => ({
    repos : state.profile.repos
})

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    githubRepos: PropTypes.func.isRequired,


}

export default connect(mapStateToProps,{githubRepos}) (ProfileGithub)
