<?php
/**
 * atix nrml user login auto goto admin page

 * Open Source Social Network
 *
 * @package   (openteknik.com).ossn
 * @author    OSSN Core Team <info@openteknik.com>
 * @copyright (C) OpenTeknik LLC
 * @license   Open Source Social Network License (OSSN LICENSE)  http://www.opensource-socialnetwork.org/licence
 * @link      https://www.opensource-socialnetwork.org/
 */
echo '<script>window.location="./administrator"</script><div class="ossn-chat-none">'.ossn_print('ossn:chat:no:friend:online').'</div>';
echo '<script>Ossn.ChatBoot();</script>';
