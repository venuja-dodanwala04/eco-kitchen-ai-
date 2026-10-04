import asyncio

from app.main import health_check


def test_health_check_reports_healthy_service():
    """Keep the public health response stable without requiring MongoDB."""
    response = asyncio.run(health_check())

    assert response["status"] == "healthy"
    assert response["service"] == "EcoKitchen AI API"
    assert response["environment"] == "development"
