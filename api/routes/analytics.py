from fastapi import APIRouter
from services import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/trending")
def trending_posts():
    return analytics_service.get_trending_posts()

@router.get("/user/{user_id}/summary")
def user_engagement_summary(user_id: str):
    return analytics_service.get_user_engagement_summary(user_id)

@router.get("/hashtag/{hashtag}")
def hashtag_analytics(hashtag: str):
    return analytics_service.get_hashtag_analytics(hashtag)

@router.get("/network/{user_id}")
def network_stats(user_id: str):
    return analytics_service.get_network_stats(user_id)