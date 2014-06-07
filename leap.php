<?php

	/**
	 * @package LeapPress
	 * @version 0.0.1
	 */
	/*
	Plugin Name: LeapPress
	Plugin URI: http://agente404.com/leap-press
	Description: Wordpress motion controller plugin based on leap.js. Navigate between posts, scroll,...
	Author: Oscar R.C. @AgenteNotFound
	Version: 0.0.1
	Author URI: http://agente404.com
	License:  Copyright (C) 2014  Oscar R.C.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	*/
	
	function leapjs() {
		/*Función para añadir el script leap.min.js*/		
		wp_enqueue_script( 'leapjs', plugins_url() . '/LeapPress/lib/leap/leap.min.js', false, '0.5.0');
	}
	
	function insert_script() {
		/*Funcion para añadir el script de control de acciones y gestos LeapPress.js*/
		
		/* Obtenemos las URL del post/página siguiente y el anterior */		
		if(is_single()){
			$prev = get_adjacent_post(false, '', true);
			if($prev) $prev_url = get_permalink($prev->ID);
			
			$next = get_adjacent_post(false, '', false);
			if($next) $next_url = get_permalink($next->ID);
		}else{
			$prev = get_previous_posts_page_link();
			if ($prev) $prev_url = $prev;
			$next = get_next_posts_page_link();
			if ($next) $next_url = $next;
		}
		
		$params = array(
			'next' => $next_url,
			'previous' => $prev_url,
		);		
		
		
		/*Cargamos y localizamos el script*/
		wp_enqueue_script( 'leappress', plugins_url() . '/LeapPress/lib/LeapPress.js', false,'0.0.1',true);
		wp_localize_script( 'leappress', 'navigation', $params );
	}
	
	add_action( 'wp_enqueue_scripts', 'leapjs' );	
	add_action( 'wp_footer', 'insert_script');

?>
