#include "Player.h"
#include "helper.h"

USING_NS_CC;

bool Player::init() {
	this->drawPoint(Vec2::ZERO, 10, Color4F(Color3B(251, 241, 210)));


  auto listener1 = EventListenerTouchOneByOne::create();

// trigger when you push down
  listener1->onTouchBegan = [](Touch* touch, Event* event){
    log("touch: %f, %f", touch->getLocation().x, touch->getLocation().y);
    return true;
  };

  this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener1, this);

	return true;
}
