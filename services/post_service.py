from repositories import mongo_repo

def create_post(user_id: str, content: str, hashtags: list = []):
    user = mongo_repo.get_user_by_id(user_id)
    if not user:
        raise ValueError("User not found")
    return mongo_repo.create_post(user_id, content, hashtags)

def get_post(post_id: str):
    return mongo_repo.get_post_by_id(post_id)

def get_all_posts():
    return mongo_repo.get_all_posts()

def get_posts_by_user(user_id: str):
    return mongo_repo.get_posts_by_user(user_id)

def get_posts_by_hashtag(hashtag: str):
    return mongo_repo.get_posts_by_hashtag(hashtag)

def add_comment(post_id: str, user_id: str, text: str):
    success = mongo_repo.add_comment(post_id, user_id, text)
    if not success:
        raise ValueError("Post not found")
    return {"message": "Comment added"}

def delete_post(post_id: str):
    return mongo_repo.delete_post(post_id)