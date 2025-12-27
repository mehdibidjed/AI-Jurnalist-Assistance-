from backend.app.infrastructure.ai.media_authenticity.image_detector import HFImageAuthenticityService


def test_image_authenticity_score():
    service = HFImageAuthenticityService()
    result = service.verify("backend/test/test_image.jpg")

    assert 0 <= result.authenticity_score <= 100

