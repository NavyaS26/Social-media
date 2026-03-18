from repositories import mongo_repo, neo4j_repo

def create_user(username: str, email: str, bio: str = ""):
    existing = mongo_repo.get_user_by_username(username)
    if existing:
        raise ValueError("Username already exists")
    user = mongo_repo.create_user(username, email, bio)
    neo4j_repo.create_user_node(user["user_id"], user["username"])
    return user

def get_user(user_id: str):
    return mongo_repo.get_user_by_id(user_id)

def get_all_users():
    return mongo_repo.get_all_users()

def follow_user(follower_id: str, followee_id: str):
    neo4j_repo.follow_user(follower_id, followee_id)
    return {"message": f"{follower_id} now follows {followee_id}"}

def unfollow_user(follower_id: str, followee_id: str):
    neo4j_repo.unfollow_user(follower_id, followee_id)
    return {"message": f"{follower_id} unfollowed {followee_id}"}

def get_suggestions(user_id: str):
    return neo4j_repo.get_suggestions(user_id)

def get_followers(user_id: str):
    return neo4j_repo.get_followers(user_id)

def get_following(user_id: str):
    return neo4j_repo.get_following(user_id)