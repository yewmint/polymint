#ifndef __GAME_SCENE_H__
#define __GAME_SCENE_H__

#include "cocos2d.h"
#include "Player.h"

class GameScene : public cocos2d::Scene {
public:
	CREATE_FUNC(GameScene);
	virtual bool init();
protected:
	cocos2d::DrawNode * background;
	Player * player;
public:
};

#endif // __GAME_SCENE_H__

