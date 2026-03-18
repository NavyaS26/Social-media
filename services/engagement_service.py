from repositories import cassandra_repo, mongo_repo

def record_engagement(post_id: str, user_id: str, action_type: str):
    if action_type not in ["like", "share", "view"]:
        raise ValueError("action_type must be like, share, or view")
    post = mongo_repo.get_post_by_id(post_id)
    if not post:
        raise ValueError("Post not found")
    cassandra_repo.record_engagement(post_id, user_id, action_type)
    return {"message": f"{action_type} recorded for post {post_id}"}

def get_engagement_counts(post_id: str):
    return cassandra_repo.get_engagement_counts(post_id)

def get_engagement_events(post_id: str):
    return cassandra_repo.get_engagement_events(post_id)