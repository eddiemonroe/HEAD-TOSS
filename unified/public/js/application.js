RosUI = {
    topics: {},
    initPage: function () {
        // send appropriate messages
        var blenderMessage, blinkMessage, treeMessage;
        switch ($('.app-change-page.active').attr('id')) {
            case 'app-expressions-link':
                console.log('expressions page load');

                blenderMessage = new ROSLIB.Message({data: 'Dummy'});
                RosUI.topics.cmdBlender.publish(blenderMessage);

                blinkMessage = new ROSLIB.Message({data: 'dmitry:stop'});
                RosUI.topics.cmdBllink.publish(blenderMessage);

                treeMessage = new ROSLIB.Message({data: 'btree_off'});
                RosUI.topics.cmdTree.publish(treeMessage);
                break;
            case 'app-motors-link':
                console.log('motors page load');

                blenderMessage = new ROSLIB.Message({data: 'Dummy'});
                RosUI.topics.cmdBlender.publish(blenderMessage);

                blinkMessage = new ROSLIB.Message({data: 'dmitry:stop'});
                RosUI.topics.cmdBllink.publish(blenderMessage);

                treeMessage = new ROSLIB.Message({data: 'btree_off'});
                RosUI.topics.cmdTree.publish(treeMessage);
                break;
            case 'app-animations-link':
                console.log('animations page load');

                blenderMessage = new ROSLIB.Message({data: 'Animations'});
                RosUI.topics.cmdBlender.publish(blenderMessage);

                blinkMessage = new ROSLIB.Message({data: 'dmitry:stop'});
                RosUI.topics.cmdBllink.publish(blenderMessage);

                treeMessage = new ROSLIB.Message({data: 'btree_off'});
                RosUI.topics.cmdTree.publish(treeMessage);

                break;
            case 'app-interactions-link':
                console.log('interactions page load');

                blenderMessage = new ROSLIB.Message({data: 'TrackDev'});
                RosUI.topics.cmdBlender.publish(blenderMessage);

                blinkMessage = new ROSLIB.Message({data: 'dmitry:start'});
                RosUI.topics.cmdBllink.publish(blenderMessage);

                treeMessage = new ROSLIB.Message({data: 'btree_on'});
                RosUI.topics.cmdTree.publish(treeMessage);
                break;
        }
    }
};

$(document).ready(function () {
    RosUI.ros = RoboInterface.connect(websocketAddress());
    RosUI.ros.$.on('connection', function () {
        RosUI.topics = {
            cmdBlender: new ROSLIB.Topic({
                ros: ros,
                name: '/cmd_blendermode',
                messageType: 'std_msgs/String'
            }),
            cmdBllink: new ROSLIB.Topic({
                ros: ros,
                name: '/dmitry/cmd_blink',
                messageType: 'std_msgs/String'
            }),
            cmdTree: new ROSLIB.Topic({
                ros: ros,
                name: '/dmitry/behavior_switch',
                messageType: 'std_msgs/String'
            })
        };

        RosUI.initPage();
    });

    var anchor = window.location.hash,
        pageLink = $('.app-change-page[href="' + anchor + '"]');

    $('.app-change-page').click(function () {
        var pageEl = $(this).data('page');
        $('.app-change-page').removeClass('active');
        $(this).addClass('active');

        if ($('.app-page:visible').length == 0) {
            $(pageEl).fadeIn();
        } else {
            $('.app-page:visible').fadeOut(400, function () {
                $(pageEl).fadeIn();
            });
        }
        $('#app-title').html($(this).html());
        $('.navbar-toggle:visible:not(.collapsed)').click();

        if (typeof ros != 'undefined') {
            RosUI.initPage();
        }
    });

    if ($(pageLink).length)
        $(pageLink).click();
    else
        $('.app-change-page.active').click();
});
