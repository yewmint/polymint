#include "GameScene.h"
#include "helper.h"

USING_NS_CC;

bool GameScene::init() {
	// background
	this->background = DrawNode::create();
	this->background->drawSolidRect(
		ORIGIN,
		ORIGIN + VISIBLE_SIZE,
		Color4F(Color3B(39, 72, 84))
	);
	this->addChild(this->background, -10);

	// player
	//this->player = Player::create();
	//this->addChild(this->player, 10);
	auto player = DrawNode::create();
	player->drawDot(ORIGIN + Vec2(100, 100), 100, Color4F(Color3B(251, 241, 210)));
	this->addChild(player);

	return true;
}
