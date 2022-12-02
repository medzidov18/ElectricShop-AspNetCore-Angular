import { Component, Input, OnInit } from '@angular/core';
import { PartnersService } from './../../services/partners.service';
import { IPartner } from './../../Models/partner';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  @Input() partnerr: IPartner 
  partners: IPartner[] = []

  constructor(private partnerService : PartnersService) { }

  ngOnInit(): void {
    this.partnerService.getPartners().subscribe(partners =>{
        this.partners = partners;
    })
  }

}
