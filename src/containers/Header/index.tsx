import React from "react";
import NavigationBar from "../../components/NavigationBar"; 

interface HeaderProps {
    openCart(event: any): void
}

/**
 * Header Container
 * @extends {Component<Props>}
 */
class Header extends React.Component<HeaderProps, {}> {
    /**
     * Renders the container.
     * @return {string} - HTML markup for the container
     */
    render() {
        return (
            <NavigationBar handleClickCart={this.props.openCart} />
        )
    }
}
 
export default Header;