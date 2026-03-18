from repositories import cassandra_repo, mongo_repo, neo4j_repo

def get_trending_posts(limit: int = 10):
    trending = cassandra_repo.get_trending_posts()
    result = []
    for item in trending[:limit]:
        post = mongo_repo.get_post_by_id(item["post_id"])
        if post:
            result.append({
                "post_id": item["post_id"],
                "content": post["content"],
                "hashtags": post["hashtags"],
                "user_id": post["user_id"],
                "likes": item["likes"],
                "shares": item["shares"],
                "views": item["views"],
                "trending_score": item["trending_score"]
            })
    return result

def get_user_engagement_summary(user_id: str):
    posts = mongo_repo.get_posts_by_user(user_id)
    summary = []
    for post in posts:
        counts = cassandra_repo.get_engagement_counts(post["post_id"])
        summary.append({
            "post_id": post["post_id"],
            "content": post["content"],
            "likes": counts["likes"],
            "shares": counts["shares"],
            "views": counts["views"]
        })
    return summary

def get_hashtag_analytics(hashtag: str):
    posts = mongo_repo.get_posts_by_hashtag(hashtag)
    total_likes, total_shares, total_views = 0, 0, 0
    for post in posts:
        counts = cassandra_repo.get_engagement_counts(post["post_id"])
        total_likes  += counts["likes"]
        total_shares += counts["shares"]
        total_views  += counts["views"]
    return {
        "hashtag": hashtag,
        "total_posts": len(posts),
        "total_likes": total_likes,
        "total_shares": total_shares,
        "total_views": total_views,
        "trending_score": round((total_likes * 1) + (total_shares * 3) + (total_views * 0.1), 2)
    }

def get_network_stats(user_id: str):
    followers = neo4j_repo.get_followers(user_id)
    following = neo4j_repo.get_following(user_id)
    suggestions = neo4j_repo.get_suggestions(user_id)
    return {
        "user_id": user_id,
        "followers_count": len(followers),
        "following_count": len(following),
        "followers": followers,
        "following": following,
        "suggestions": suggestions
    }