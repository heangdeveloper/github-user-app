import React, { useState } from "react";
import Moment from "moment";

import Avatar from './assets/avatar.png'
import SearchIcon from './assets/icon-search.svg'
import LocationIcon from './assets/icon-location.svg'
import TwitterIcon from './assets/icon-twitter.svg'
import LinkIcon from './assets/icon-website.svg'
import CompanyIcon from './assets/icon-company.svg'

function App() {
    const [username, setUsername] = useState("");
    const [data, setData] = useState({})

    const handleChangeUser = (e) => {
        setUsername(e.target.value)
    }

    const handleGetUser = async (e) => {
        e.preventDefault()
        const profile = await fetch(`https://api.github.com/users/${username}`)
        const profileJson = await profile.json();
        console.log(profileJson)

        if (profileJson) {
            setData(profileJson)
        }
    }

    return (
        <>
            <div className="profile_container">
                <header className="">
                    <div className="btn_mode">
                        <p className="mode_txt"></p>
                        <img src="" alt="" className="mode_icon"/>
                    </div>
                </header>
                <main className="profile_card">
                    <div className="search_bar">
                        <img src={SearchIcon} alt="" className="icon_search"/>
                        <input
                            type="text"
                            className="box_search"
                            autoFocus
                            placeholder="Search GitHub username..."
                            value={username}
                            onChange={handleChangeUser}
                        />
                        <button className="btn_search" onClick={handleGetUser}>Search</button>
                    </div>
                    <div className="profile_wrap">
                        <div className="profile_content">
                            <div className="profile_header">
                                {!data.avatar_url ? (
                                    <img src={Avatar} alt="" className="profile_avatar"/>
                                ) : (
                                    <img src={data.avatar_url} alt={data.name} className="profile_avatar"/>
                                )}
                                
                                <div className="profile_info">
                                    <div>
                                        {!data.name ? (
                                            <h2 className="profile_name">Unknow Name</h2>
                                        ) : (
                                            <h2 className="profile_name">{data.name}</h2>
                                        )}
                                        {!data.login ? (
                                            <span>Unknow Username</span>
                                        ) : (
                                            <span>@{data.login}</span>
                                        )}
                                    </div>
                                    {!data.created_at ? (
                                        <span className="profile_date">Not Available</span>
                                    ) : (
                                        <span className="profile_date">
                                            Joined {Moment(data.created_at).format("DD MMM YYYY")}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {!data.bio ? (
                                <p className="profile_bio">This profile has no bio</p>
                            ) : (
                                <p className="profile_bio">{data.bio}</p>
                            )}
                            <div className="profile_state_wrap">
                                <div className="profile_state">
                                    <p>Repos</p>
                                    {!data.public_repos ? (
                                        <span>0</span>
                                    ) : (
                                        <span>{data.public_repos}</span>
                                    )}
                                </div>
                                <div className="profile_state">
                                    <p>Followers</p>
                                    {!data.followers ? (
                                        <span>0</span>
                                    ) : (
                                        <span>{data.followers}</span>
                                    )}
                                </div>
                                <div className="profile_state">
                                    <p>Following</p>
                                    {!data.following ? (
                                        <span>0</span>
                                    ) : (
                                        <span>{data.following}</span>
                                    )}
                                </div>
                            </div>
                            <div className="profile_link_wrap">
                                <div className="link_info">
                                    <div className="link_icon">
                                        <img src={LocationIcon} alt=""/>
                                    </div>
                                    {!data.location ? (
                                        <p>Not Available</p>
                                    ) : (
                                        <p>{data.location}</p>
                                    )}
                                </div>
                                <div className="link_info">
                                    <div className="link_icon">
                                        <img src={TwitterIcon} alt=""/>
                                    </div>
                                    {!data.twitter_username ? (
                                        <p>Not Available</p>
                                    ) : (
                                        <p>{data.twitter_username}</p>
                                    )}
                                </div>
                                <div className="link_info">
                                    <div className="link_icon">
                                        <img src={LinkIcon} alt=""/>
                                    </div>
                                    {!data.blog ? (
                                        <p>Not Available</p>
                                    ) : (
                                        <p>{data.blog}</p>
                                    )}
                                </div>
                                <div className="link_info">
                                    <div className="link_icon">
                                        <img src={CompanyIcon} alt=""/>
                                    </div>
                                    {!data.company ? (
                                        <p>Not Available</p>
                                    ) : (
                                        <p>{data.company}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
