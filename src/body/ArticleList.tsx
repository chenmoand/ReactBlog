import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';
import axios from 'axios';
import { BaseArticle, BaseProps, API } from '../util/Stars';
import { Link } from 'react-router-dom';
import NProgress from "nprogress";


const initial: BaseArticle[] = [{
    // id : 0,
    articleName: "null",
    describe: "null",
    // author: "null",
    // lable: "null",
    // classification: "null",
    // content: "null",
    // date: "null",
    url: "null"
}]

interface IProps extends BaseProps{
    src : Article,
}

interface Article {
    title : string,
    describe : string,
    url : string
}

const Article:React.FC<IProps> = (props : IProps) => {
    const {title, describe, url } = props.src;

    return(
        <div className="app-body-left" style={props.style}>
            <Link to={url}>
                <h5 style={{margin: 8}}>{title}</h5>
            </Link>
            <hr className="Article-hr" />
            <ReactMarkdown
                className="Article-md" 
                source={describe}
                escapeHtml={false}
            />
            <Button
                type="dashed"
                style={{float: "right"}}
                onClick={()=>{
                    NProgress.start()
                    NProgress.done()
                }}
            >
                <Link to={url}>
                    浏览更多
                </Link>
            </Button>
        </div>
    )
};

interface ArticleListProps {
    page : number,
    className? : string,
    style?: object
}

const { useState, useEffect } = React

const ArticleList: React.FC<ArticleListProps> = (props: ArticleListProps ) => {
    const [ article , setArticle] = useState(initial);
    const { page } = props;
    
    useEffect(() => {
        axios.get(
            // 要8个文章,,老衲不贪
            `${API}api/article/page?current=${page<=1?0:page*7}&size=8`
        )
        .then(res => {
            setArticle(res.data as BaseArticle[])     
        })
        .catch(() => {
            console.log("获取文章失败");
        }) 
    },[page])
    return(
        <div>
            {
            article.map((item,key) => {
            return(
                <React.Fragment key={key}>
                    <Article 
                        src={{title: item.articleName, describe: item.describe, url: item.url }}
                    />
                </React.Fragment>
            )})
            }
        </div>
    )

    
}
export default ArticleList;